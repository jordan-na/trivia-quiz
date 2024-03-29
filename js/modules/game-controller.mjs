import { apiHandler } from "./api-handler.mjs";
import { uiController } from "./ui-controller.mjs";
import { utils } from "./utils.mjs";
import { TriviaGame } from "./TriviaGame.mjs";
import { CountDownTriviaGame } from "./CountdownTriviaGame.mjs";
import { TriviaGameLevel } from "./TriviaGameLevel.mjs";
import { audioController } from "./audio-controller.mjs";
import { levels } from "./levels.mjs";

export const gameController = (() => {
   let game;
   let gameMode;
   let timeLimit = 60;
   let highestLevelOpened = localStorage.getItem("highest-level-opened") ? localStorage.getItem("highest-level-opened") : 1;
   let currentLevel = 1;

   const multipleAnswers = document.querySelectorAll("#multiple-answers button");
   const booleanAnswers = document.querySelectorAll("#boolean-answers button");
   const checkMarkBtn = document.querySelector("#check-mark-btn");
   const levelSquares = document.querySelectorAll(".level");
   const gameFinish = document.querySelector("#game-finish");

   const initLevels = () => {
      for(let i = 1; i < highestLevelOpened; i++) {
         levelSquares[i].classList.add("open");
      }
   };

   const startGame = async (levelNumber) => {
      checkMarkBtn.classList.add("hide");
      if (gameMode === "classic" || gameMode === "countdown") {
         const category = document.querySelector("#category-selector").innerText;
         const data = await apiHandler.getQuestions(category);
         if(gameMode === "classic") {
            game = new TriviaGame(data);
            uiController.showGame(game.getCurrentQuestion().type);
         } else if (gameMode === "countdown") {
            game = new CountDownTriviaGame(data, category, timeLimit, 5);
            await uiController.showCountdownGame(game.getCurrentQuestion().type);
            game.startTimer();
         }
      } else if (gameMode === "adventure") {
         const data = levels[levelNumber - 1];
         game = new TriviaGameLevel(data.questions, data.difficulty);
         uiController.showGame(game.getCurrentQuestion().type, true);
      }
      loadQuestionData(game.getCurrentQuestion());
   };

   const loadQuestionData = (data) => {
      document.querySelector("#question").innerHTML = utils.wrapSpChars(data.question);
      if(data.type === "multiple") {
         const answers = [data.correct_answer, ...data.incorrect_answers];
         utils.shuffleArr(answers);
         for(let i = 0; i < multipleAnswers.length; i++) {
            multipleAnswers[i].innerHTML = utils.wrapSpChars(answers[i]);
            if(data.correct_answer === answers[i]) multipleAnswers[i].correct = true;
         }
      } else if (data.type === "boolean") {
            for(let i = 0; i < booleanAnswers.length; i++) {
               if(booleanAnswers[i].innerHTML === data.correct_answer) booleanAnswers[i].correct = true;
            }
      }
   };

   const answer = (evt) => {
      const answer = evt.currentTarget;
      if(answer.correct) {
         game.increaseScore();
         uiController.setScore(game.getScore());
         setTimeout(audioController.playWinSound, 100);
         if(gameMode === "countdown") {
            const timeDifference = game.getTimeLimit() - game.getTime();
            if(timeDifference < game.getTimeToAdd()) game.addTime(timeDifference);
            else game.addTime();
         }
      } else {
         game.increaseNumWrong();
         setTimeout(audioController.playLoseSound, 100);
      }
      uiController.highlightAnswers();
      setTimeout(nextQuestion, 750);
   };

   const nextQuestion = async () => {
      game.nextQuestion();
      if(!game.noMoreQuestions()) {
         uiController.showNextQuestion(game.getCurrentQuestion().type);
         setTimeout(() => loadQuestionData(game.getCurrentQuestion()), 350);
      } else {
         if(gameMode === "countdown") {
            await game.resetQuestions();
            game.nextQuestion();
            uiController.showNextQuestion(game.getCurrentQuestion().type);
            setTimeout(() => loadQuestionData(game.getCurrentQuestion()), 350);
         } else {
            setTimeout(() => {
               if(gameMode === "adventure") {
                  const prevHighScore = localStorage.getItem(`level-${currentLevel}-high-score`);
                  if(!prevHighScore || game.getScore() > prevHighScore) {
                     localStorage.setItem(`level-${currentLevel}-high-score`, game.getScore());
                  }
                  if(game.passed() && currentLevel === highestLevelOpened) {
                     levelSquares[highestLevelOpened++].classList.add("open");
                     localStorage.setItem("highest-level-opened", highestLevelOpened);
                  }
                  uiController.showGameFinishScreen(gameMode, game);
               } else {
                  uiController.showGameFinishScreen(gameMode);
               }
            }, 350);
         }
      }
   }

   const stopTimer = () => {
      if(gameMode === "countdown" && game && game instanceof CountDownTriviaGame) game.stopTimer();
   };

   const getTimeLimit = () => {
      return timeLimit;
   }

   const getLevelData = (levelNumber) => {
      return levels[levelNumber - 1];
   };

   const getCurrentLevelNumber = () => {
      return currentLevel;
   }

   const setCurrentLevelNumber = (level) => {
      currentLevel = level;
   }

   const setMode = (mode) => {
      gameMode = mode;
      gameFinish.classList.add(gameMode);
   };

   return {
      initLevels: initLevels,
      startGame: startGame,
      answer: answer,
      stopTimer: stopTimer,
      getTimeLimit: getTimeLimit,
      getLevelData: getLevelData,
      getCurrentLevelNumber: getCurrentLevelNumber,
      setCurrentLevelNumber: setCurrentLevelNumber,
      setMode: setMode,
   };
})();
