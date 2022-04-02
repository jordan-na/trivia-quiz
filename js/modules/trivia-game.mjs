import { apiHandler } from "./api-handler.mjs";
import { uiController } from "./ui-controller.mjs";
import { utils } from "./utils.mjs";

export const triviaGame = (() => {
   let game;
   let gameMode;
   let levels;

   const multipleAnswers = document.querySelectorAll("#multiple-answers button");
   const booleanAnswers = document.querySelectorAll("#boolean-answers button");

   const initLevels = async () => {
      const data = await fetch("../../levels.json")
         .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res;
         })
         .then((res) => res.json())
         .catch((err) => console.log(err));
      levels = data.levels;
   };

   const startGame = async (levelNumber) => {
      if (gameMode === "classic" || gameMode === "countdown") {
         const category = document.querySelector("#category-selector").innerText;
         const data = await apiHandler.getQuestions(category);
         if(gameMode === "classic") {
            game = new TriviaGame(data);
            uiController.showGame(game.getCurrentQuestion().type);
         } else if (gameMode === "countdown") {
            game = new CountDownTriviaGame(data);
            uiController.showCountdownGame(game.getCurrentQuestion().type);
         }
      } else if (gameMode === "adventure") {
         const data = levels[levelNumber - 1];
         game = new TriviaGame(data.questions);
         uiController.showGame(game.getCurrentQuestion().type);
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
      }
      uiController.highlightAnswers();
      setTimeout(nextQuestion, 750);
   };

   const nextQuestion = () => {
      game.nextQuestion();
      if(!game.isLastQuestion()) {
         uiController.showNextQuestion(game.getCurrentQuestion().type);
         setTimeout(() => loadQuestionData(game.getCurrentQuestion()), 350);
      } else {
         console.log("last question");
      }
   }

   const setMode = (mode) => {
      gameMode = mode;
   };

   return {
      initLevels: initLevels,
      startGame: startGame,
      answer: answer,
      setMode: setMode,
   };
})();

class TriviaGame {
   #questions;
   #questionIndex;
   #currentQuestion;
   #score;

   constructor(data) {
      this.#questions = data;
      this.#questionIndex = 0;
      this.#currentQuestion = this.#questions[this.#questionIndex];
      this.#score = 0;
   }

   checkAnswer(answer) {
      return answer === this.#currentQuestion.answer;
   }

   getCurrentQuestion() {
      return this.#currentQuestion;
   }

   nextQuestion() {
      this.#currentQuestion = this.#questions[++this.#questionIndex];
   }

   isLastQuestion() {
      return this.#questionIndex === this.#questions.length;
   }

   increaseScore() {
      this.#score++;
   }

   getScore() {
      return this.#score;
   }
}

class CountDownTriviaGame extends TriviaGame {
   constructor(data) {
      super(data);
   }
}