import { uiController } from "./ui-controller.mjs";
import { triviaGame } from "./trivia-game.mjs";

export const eventHandler = (() => {
   const setupShowPlayBtnListener = () => {
      const removeChildrenPropogation = (node) => {
         node.addEventListener("animationend", (evt) => evt.stopPropagation());
         if (node.children.length === 0) return;
         for (const child of node.children) {
            removeChildrenPropogation(child);
         }
      };
      removeChildrenPropogation(document.querySelector("#title-container"));
      document.querySelector("#title-container").addEventListener("animationend", uiController.showPlayBtn);
   };

   const setupHomeBtnListener = () => {
      document.querySelector("#home-btn").addEventListener("click", uiController.goBackToMenu);
   };

   const setupShowGameBtnsListener = () => {
      document.querySelector("#title-container").addEventListener("animationend", uiController.showGameBtns);
   };

   const setupPlayBtnListeners = () => {
      const playBtn = document.querySelector("#play-btn");
      playBtn.addEventListener("mouseenter", uiController.togglePlayBtnHover);
      playBtn.addEventListener("mouseleave", uiController.togglePlayBtnHover);
   };

   const setupShowGameModesListener = () => {
      document.querySelector("#play-btn").addEventListener("click", uiController.showGameModes);
   };

   const setupStartGameModeListeners = () => {
      document.querySelector("#classic").addEventListener("click", () => {
         uiController.showCategorySelector();
         triviaGame.setMode("classic");
      });
      document.querySelector("#countdown").addEventListener("click", () => {
         uiController.showCategorySelector();
         triviaGame.setMode("countdown");
      });
      document.querySelector("#adventure").addEventListener("click", () => {
         uiController.showAdventureLevels();
         triviaGame.setMode("adventure");
      });
   };

   const setupCategorySelectorListeners = () => {
      document.querySelector("#category-selector").addEventListener("click", uiController.toggleCategories);
      document.querySelectorAll("#categories li").forEach((li) =>
         li.addEventListener("click", () => {
            uiController.toggleCategories();
            uiController.changeCategoryText(li);
         })
      );
   };

   const setupStartGameListeners = () => {
      document.querySelector("#check-mark-btn").addEventListener("click", triviaGame.startGame);
      for (const btn of document.querySelectorAll(".level")) {
         const levelNumber = parseInt(btn.textContent);
         btn.addEventListener("click", () => triviaGame.startGame(levelNumber));
      }
   };

   const setupAnswerListeners = () => {
      for(const btn of document.querySelectorAll(".answers button")) {
         btn.addEventListener("click", triviaGame.answer);
      }
   };

   const setupBackBtnListener = () => {
      document.querySelector("#back-btn").addEventListener("click", uiController.goBack);
   };

   const setupEventListeners = () => {
      setupShowPlayBtnListener();
      setupHomeBtnListener();
      setupPlayBtnListeners();
      setupShowGameBtnsListener();
      setupShowGameModesListener();
      setupStartGameModeListeners();
      setupCategorySelectorListeners();
      setupStartGameListeners();
      setupBackBtnListener();
      setupAnswerListeners();
   };

   return {
      setupEventListeners: setupEventListeners,
   };
})();
