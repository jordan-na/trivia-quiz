export const uiController = (() => {
   let played = false;
   let playBtnHover = false;

   const showLoadingTransitionBtn = () => {
      document.querySelector("#loading-bar").classList.add("hide");
      document.querySelector("#loading-icon").classList.add("hide");
      document.querySelector("#ripple").classList.remove("hide");
   };

   const showGameBackground = () => {
      document.querySelector("#ripple").classList.add("hide");
      document.querySelector("#game-container").classList.add("expand");
   };

   const showPlayBtn = async () => {
      if (!played) {
         played = true;
         document.querySelector("#main-menu").classList.add("grow");
         await wait(350);
         document.querySelector("#play-btn").classList.add("show");
         new Vivus("play-btn-svg-vivus", { duration: 50, delay: 20 }, () => {
            document.querySelector("#play-btn-svg").classList.add("show");
            document.querySelector("#play-btn-svg-vivus").classList.add("remove");
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

   const goBackToMenu = async () => {
      document.querySelector("#game-modes").classList.remove("show");
      await wait(250);
      document.querySelector("#main-menu").classList.remove("hide");
   };

   const showGameBtns = () => {
      document.querySelector("#help-btn").classList.add("show");
      document.querySelector("#settings-btn").classList.add("show");
   };

   const showGameModes = async () => {
      document.querySelector("#main-menu").classList.add("hide");
      await wait(250);
      document.querySelector("#game-modes").classList.add("show");
   };

   const showCategorySelector = async () => {
      document.querySelector("#game-modes").classList.add("hide");
      document.querySelector("#game-modes").classList.remove("show");
      await wait(250);
      document.querySelector("#categories-container").classList.add("show");
      document.querySelector("#back-btn").classList.add("show");
   };

   const toggleCategories = async () => {
      document.querySelector("#category-selector-container").classList.toggle("open");
      document.querySelector("#check-mark-btn").classList.toggle("hide");
      await wait(250);
      document.querySelector("#categories").scroll(0, 0);
   };

   const changeCategoryText = (li) => {
      const text = li.innerText;
      document.querySelector("#category-selector").childNodes[2].nodeValue = text;
   };

   const goBack = async () => {
      if (document.querySelector("#categories-container").classList.contains("show")) {
         document.querySelector("#categories-container").classList.remove("show");
      } else if (document.querySelector("#levels-container").classList.contains("show")) {
         document.querySelector("#levels-container").classList.remove("show");
      } else if (document.querySelector("#trivia-container").classList.contains("show")) {
         document.querySelector("#trivia-container").classList.remove("show");
         document.querySelector("#multiple-answers").classList.remove("show");
         document.querySelector("#boolean-answers").classList.remove("show");
         for (const btn of document.querySelectorAll(".answers button")) {
            btn.correct = false;
            btn.classList.remove("correct");
            btn.classList.remove("wrong");
         }
         setScore(0);
      }
      document.querySelector("#back-btn").classList.remove("show");
      await wait(250);
      document.querySelector("#level-grid").scroll(0, 0);
      document.querySelector("#game-modes").classList.remove("hide");
      document.querySelector("#game-modes").classList.add("show");
   };

   const showAdventureLevels = async () => {
      document.querySelector("#game-modes").classList.add("hide");
      document.querySelector("#game-modes").classList.remove("show");
      await wait(250);
      document.querySelector("#levels-container").classList.add("show");
      document.querySelector("#back-btn").classList.add("show");
   };

   const showGame = async (type) => {
      document.querySelector("#categories-container").classList.remove("show");
      document.querySelector("#levels-container").classList.remove("show");
      await wait(250);
      document.querySelector("#trivia-container").classList.add("show");
      if (type === "multiple") document.querySelector("#multiple-answers").classList.add("show");
      else if (type === "boolean") document.querySelector("#boolean-answers").classList.add("show");
   };

   const showCountdownGame = (type) => {
      showGame(type);
   };

   const highlightAnswers = () => {
      for (const btn of document.querySelectorAll(".answers button")) {
         if (btn.correct) btn.classList.add("correct");
         if (!btn.correct) btn.classList.add("wrong");
      }
   };

   const showNextQuestion = async (type) => {
      document.querySelector("#question-container").classList.add("hide");
      document.querySelector("#multiple-answers").classList.add("hide");
      document.querySelector("#boolean-answers").classList.add("hide");
      for (const btn of document.querySelectorAll(".answers button")) {
         btn.correct = false;
         btn.classList.remove("correct");
         btn.classList.remove("wrong");
      }
      await wait(300);
      document.querySelector("#multiple-answers").classList.remove("hide");
      document.querySelector("#multiple-answers").classList.remove("show");
      document.querySelector("#boolean-answers").classList.remove("hide");
      document.querySelector("#boolean-answers").classList.remove("show");
      await wait(50);
      document.querySelector("#question-container").classList.remove("hide");
      if (type === "multiple") document.querySelector("#multiple-answers").classList.add("show");
      else if (type === "boolean") document.querySelector("#boolean-answers").classList.add("show");
   };

   const setScore = (score) => {
      document.querySelector("#score").innerText = `${score}`;
   };

   const wait = (time) => {
      return new Promise((resolve, reject) => {
         setTimeout(resolve, time);
      });
   };

   return {
      showLoadingTransitionBtn: showLoadingTransitionBtn,
      showGameBackground: showGameBackground,
      showPlayBtn: showPlayBtn,
      togglePlayBtnHover: togglePlayBtnHover,
      goBackToMenu: goBackToMenu,
      showGameBtns: showGameBtns,
      showGameModes: showGameModes,
      showCategorySelector: showCategorySelector,
      toggleCategories: toggleCategories,
      changeCategoryText: changeCategoryText,
      goBack: goBack,
      showAdventureLevels: showAdventureLevels,
      showGame: showGame,
      showCountdownGame: showCountdownGame,
      highlightAnswers: highlightAnswers,
      showNextQuestion: showNextQuestion,
      setScore: setScore
   };
})();
