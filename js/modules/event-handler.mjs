import { uiController } from "./ui-controller.mjs";
import { gameController } from "./game-controller.mjs";

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

   const setupHelpBtnListeners = () => {
      document.querySelector("#help-btn").addEventListener("click", uiController.toggleHelp);
      document.querySelector("#help-close").addEventListener("click", uiController.toggleHelp);
   };

   const setupHelpNavBtns = () => {
      for (const btn of document.querySelectorAll(".nav-btn")) {
         btn.addEventListener("click", uiController.switchModeDescription);
      }
   };

   const setupSettingsBtnListeners = () => {
      document.querySelector("#settings-btn").addEventListener("click", uiController.toggleSettings);
      document.querySelector("#settings-close").addEventListener("click", uiController.toggleSettings);
   };

   const setupShowGameModesListener = () => {
      document.querySelector("#play-btn").addEventListener("click", uiController.showGameModes);
   };

   const setupStartGameModeListeners = () => {
      document.querySelector("#classic").addEventListener("click", () => {
         uiController.showCategorySelector();
         gameController.setMode("classic");
      });
      document.querySelector("#countdown").addEventListener("click", () => {
         uiController.showCategorySelector();
         gameController.setMode("countdown");
      });
      document.querySelector("#adventure").addEventListener("click", () => {
         uiController.showAdventureLevels();
         gameController.setMode("adventure");
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
      document.querySelector("#check-mark-btn").addEventListener("click", gameController.startGame);
      document.querySelector("#level-play-btn").addEventListener("click", () => {
         gameController.startGame(gameController.getCurrentLevelIndex())
      });
   };

   const setupLevelBtnListeners = () => {
      for (const btn of document.querySelectorAll(".level")) {
         const levelNumber = parseInt(btn.textContent) - 1;
         btn.addEventListener("click", () => uiController.showLevelDetails(gameController.getLevelData(levelNumber)));
      }
   };

   const setupAnswerListeners = () => {
      for (const btn of document.querySelectorAll(".answers button")) {
         btn.addEventListener("click", gameController.answer);
      }
   };

   const setupBackBtnListener = () => {
      document.querySelector("#back-btn").addEventListener("click", uiController.goBack);
   };

   const setupQuitBtnListener = () => {
      document.querySelector("#quit-btn").addEventListener("click", uiController.goBack);
   };

   const setupPlayAgainListener = () => {
      document.querySelector("#play-again-btn").addEventListener("click", uiController.playAgain);
   };

   const setupEventListeners = () => {
      setupShowPlayBtnListener();
      setupHomeBtnListener();
      setupPlayBtnListeners();
      setupHelpBtnListeners();
      setupHelpNavBtns();
      setupSettingsBtnListeners();
      setupShowGameBtnsListener();
      setupShowGameModesListener();
      setupStartGameModeListeners();
      setupCategorySelectorListeners();
      setupStartGameListeners();
      setupLevelBtnListeners();
      setupAnswerListeners();
      setupBackBtnListener();
      setupQuitBtnListener();
      setupPlayAgainListener();
   };

   return {
      setupEventListeners: setupEventListeners,
   };
})();
