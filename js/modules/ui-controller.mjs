import { gameController } from "./game-controller.mjs";
import { TriviaGameLevel } from "./TriviaGameLevel.mjs";

export const uiController = (() => {
   let played = false;
   let playBtnHover = false;
   let playingLevel = false;

   const mainMenu = document.querySelector("#main-menu");
   const playBtn = document.querySelector("#play-btn");
   const helpBtn = document.querySelector("#help-btn");
   const settingsBtn = document.querySelector("#settings-btn");
   const helpContainer = document.querySelector("#help-container");
   const helpNavBtns = document.querySelectorAll(".nav-btn");
   const modeDescriptions = document.querySelector("#mode-descriptions");
   const settingsContainer = document.querySelector("#settings-container");
   const darkBg = document.querySelector("#dark-bg");
   const gameModes = document.querySelector("#game-modes");
   const categoriesContainer = document.querySelector("#categories-container");
   const categorySelectorContainer = document.querySelector("#category-selector-container");
   const categorySelector = document.querySelector("#category-selector");
   const checkMarkBtn = document.querySelector("#check-mark-btn");
   const categories = document.querySelector("#categories");
   const backBtn = document.querySelector("#back-btn");
   const triviaContainer = document.querySelector("#trivia-container");
   const questionContainer = document.querySelector("#question-container");
   const multipleAnswers = document.querySelector("#multiple-answers");
   const booleanAnswers = document.querySelector("#boolean-answers");
   const score = document.querySelector("#score");
   const timerBar = document.querySelector("#timer-bar");
   const time = document.querySelector("#time");
   const timeAdded = document.querySelector("#time-added");
   const answerBtns = document.querySelectorAll(".answers button");
   const levelsContainer = document.querySelector("#levels-container");
   const levelGrid = document.querySelector("#level-grid");
   const levelDetails = document.querySelector("#level-details");
   const levelHeader = document.querySelector("#level-header");
   const difficulty = document.querySelector("#difficulty");
   const passingScore = document.querySelector("#passing-score");
   const highScore = document.querySelector("#high-score");
   const gameFinish = document.querySelector("#game-finish");
   const scores = document.querySelectorAll(".score");
   const levelResultMssg = document.querySelector("#level-result-mssg");
   const numQuestionsToPassMssg = document.querySelector("#num-questions-to-pass-mssg");

   const showPlayBtn = async () => {
      if (!played) {
         played = true;
         mainMenu.classList.add("grow");
         await wait(350);
         playBtn.classList.add("show");
         new Vivus("play-btn-svg-vivus", { duration: 50, delay: 20 }, () => {
            playBtn.children[1].classList.add("show");
            playBtn.children[0].classList.add("remove");
         });
      }
   };

   const togglePlayBtnHover = () => {
      const playIcon = document
         .querySelector("#play-btn-svg")
         .contentDocument.firstElementChild.querySelector("#layer2 path");
      if (!playBtnHover) playIcon.style.fill = "#000";
      else playIcon.style.fill = "none";
      playBtnHover = !playBtnHover;
   };

   const toggleHelp = () => {
      darkBg.classList.toggle("show");
      helpContainer.classList.toggle("show");
      setTimeout(() => {
         for (const btn of helpNavBtns) btn.classList.remove("selected");
         helpNavBtns[0].classList.add("selected");
         modeDescriptions.style.transform = `translateX(0%)`;
      }, 300);
   };

   const switchModeDescription = (evt) => {
      for (const btn of helpNavBtns) btn.classList.remove("selected");
      evt.currentTarget.classList.add("selected");
      const index = [...helpNavBtns].indexOf(evt.currentTarget);
      const padding = window.getComputedStyle(modeDescriptions.parentElement, null).getPropertyValue("padding");
      modeDescriptions.style.transform = `translateX(calc(-${index * 100}% - ${padding} * ${index}))`;
   };

   const toggleSettings = () => {
      darkBg.classList.toggle("show");
      settingsContainer.classList.toggle("show");
   };

   const goBackToMenu = async () => {
      gameModes.classList.remove("show");
      await wait(250);
      mainMenu.classList.remove("hide");
   };

   const showGameBtns = () => {
      helpBtn.classList.add("show");
      settingsBtn.classList.add("show");
   };

   const showGameModes = async () => {
      mainMenu.classList.add("hide");
      await wait(250);
      gameModes.classList.add("show");
   };

   const showCategorySelector = async () => {
      gameModes.classList.add("hide");
      gameModes.classList.remove("show");
      await wait(250);
      categoriesContainer.classList.add("show");
      backBtn.classList.add("show");
   };

   const toggleCategories = async () => {
      categorySelectorContainer.classList.toggle("open");
      checkMarkBtn.classList.toggle("hide");
      await wait(250);
      categories.scroll(0, 0);
   };

   const changeCategoryText = (li) => {
      const text = li.innerText;
      categorySelector.childNodes[2].nodeValue = text;
   };

   const goBack = async () => {
      checkMarkBtn.classList.remove("hide");
      categoriesContainer.classList.remove("show");
      levelsContainer.classList.remove("show");
      triviaContainer.classList.remove("show");
      multipleAnswers.classList.remove("show");
      booleanAnswers.classList.remove("show");
      timerBar.classList.remove("show");
      gameFinish.classList.remove("show");
      setTimeout(() => (gameFinish.className = ""), 300);
      for (const btn of answerBtns) {
         btn.correct = false;
         btn.classList.remove("correct");
         btn.classList.remove("wrong");
      }
      setTimeout(() => setScore(0), 300);
      setTime(gameController.getTimeLimit());
      gameController.stopTimer();
      document.documentElement.style.setProperty("--bar-width", "100%");
      if (playingLevel) {
         await wait(350);
         levelsContainer.classList.add("show");
         playingLevel = false;
      } else if (levelDetails.classList.contains("show")) {
         levelDetails.classList.remove("show");
         await wait(350);
         levelsContainer.classList.add("show");
      } else {
         backBtn.classList.remove("show");
         await wait(350);
         levelGrid.scroll(0, 0);
         gameModes.classList.remove("hide");
         gameModes.classList.add("show");
      }
   };

   const showAdventureLevels = async () => {
      gameModes.classList.add("hide");
      gameModes.classList.remove("show");
      await wait(250);
      levelsContainer.classList.add("show");
      backBtn.classList.add("show");
   };

   const showLevelDetails = (level) => {
      levelsContainer.classList.remove("show");
      levelHeader.innerText = `Level ${level.levelNumber}`;
      difficulty.classList.add(level.difficulty);
      passingScore.innerText = `${TriviaGameLevel.getPassingScoreByDifficulty(level.difficulty)}`;
      highScore.innerText = localStorage.getItem(`level-${level.levelNumber}-high-score`)
         ? localStorage.getItem(`level-${level.levelNumber}-high-score`)
         : 0;
      setTimeout(() => levelDetails.classList.add("show"), 350);
   };

   const showGame = async (type, isLevel) => {
      if (isLevel) playingLevel = true;
      categoriesContainer.classList.remove("show");
      levelDetails.classList.remove("show");
      await wait(250);
      levelGrid.scroll(0, 0);
      triviaContainer.classList.add("show");
      if (type === "multiple") multipleAnswers.classList.add("show");
      else if (type === "boolean") booleanAnswers.classList.add("show");
      for (const btn of answerBtns) btn.classList.remove("no-pointer-events");
   };

   const showCountdownGame = (type) => {
      showGame(type);
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            timerBar.classList.add("show");
            resolve();
         }, 200);
      });
   };

   const highlightAnswers = () => {
      for (const btn of answerBtns) {
         if (btn.correct) btn.classList.add("correct");
         if (!btn.correct) btn.classList.add("wrong");
         btn.classList.add("no-pointer-events");
      }
   };

   const showNextQuestion = async (type) => {
      questionContainer.classList.add("hide");
      multipleAnswers.classList.add("hide");
      booleanAnswers.classList.add("hide");
      await wait(300);
      for (const btn of answerBtns) {
         btn.correct = false;
         btn.classList.remove("correct");
         btn.classList.remove("wrong");
      }
      multipleAnswers.classList.remove("hide");
      multipleAnswers.classList.remove("show");
      booleanAnswers.classList.remove("hide");
      booleanAnswers.classList.remove("show");
      await wait(50);
      questionContainer.classList.remove("hide");
      if (type === "multiple") multipleAnswers.classList.add("show");
      else if (type === "boolean") booleanAnswers.classList.add("show");
      await wait(600);
      for (const btn of answerBtns) btn.classList.remove("no-pointer-events");
   };

   const setScore = (s) => {
      score.innerText = `${s}`;
      scores.forEach((sc) => (sc.innerText = `${s}`));
   };

   const setTime = (t) => {
      time.innerText = `${t}`;
   };

   const updateTimerBar = (time, totalTime) => {
      const percentage = `${(time / totalTime) * 100}%`;
      document.documentElement.style.setProperty("--bar-width", percentage);
   };

   const addTime = async (time) => {
      timeAdded.childNodes[1].nodeValue = `${time}`;
      timeAdded.classList.add("show");
      await wait(1500);
      timeAdded.classList.remove("show");
   };

   const showGameFinishScreen = (mode, adventureGame) => {
      triviaContainer.classList.remove("show");
      multipleAnswers.classList.remove("show");
      booleanAnswers.classList.remove("show");
      for (const btn of answerBtns) {
         btn.correct = false;
         btn.classList.remove("correct");
         btn.classList.remove("wrong");
      }
      gameFinish.classList.add("show");
      gameFinish.classList.add(mode);
      if (adventureGame) {
         if (adventureGame.passed()) {
            gameFinish.classList.add("passed");
            levelResultMssg.innerText = "Level Passed";
         } else {
            gameFinish.classList.add("failed");
            levelResultMssg.innerText = "Level Failed";
            numQuestionsToPassMssg.innerText = `You need ${adventureGame.getPassingScore()} right answers to pass`;
         }
      }
   };

   const playAgain = () => {
      gameFinish.classList.remove("show");
      checkMarkBtn.classList.remove("hide");
      document.documentElement.style.setProperty("--bar-width", "100%");
      setTime(gameController.getTimeLimit());
      setTimeout(() => {
         categoriesContainer.classList.remove("hide");
         categoriesContainer.classList.add("show");
         setScore(0);
      }, 300);
   };

   const wait = (time) => {
      return new Promise((resolve, reject) => {
         setTimeout(resolve, time);
      });
   };

   return {
      showPlayBtn: showPlayBtn,
      togglePlayBtnHover: togglePlayBtnHover,
      toggleHelp: toggleHelp,
      switchModeDescription: switchModeDescription,
      toggleSettings: toggleSettings,
      goBackToMenu: goBackToMenu,
      showGameBtns: showGameBtns,
      showGameModes: showGameModes,
      showCategorySelector: showCategorySelector,
      toggleCategories: toggleCategories,
      changeCategoryText: changeCategoryText,
      goBack: goBack,
      showAdventureLevels: showAdventureLevels,
      showLevelDetails: showLevelDetails,
      showGame: showGame,
      showCountdownGame: showCountdownGame,
      highlightAnswers: highlightAnswers,
      showNextQuestion: showNextQuestion,
      setScore: setScore,
      setTime: setTime,
      addTime: addTime,
      updateTimerBar: updateTimerBar,
      showGameFinishScreen: showGameFinishScreen,
      playAgain: playAgain,
   };
})();
