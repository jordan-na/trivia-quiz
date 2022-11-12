import { uiController } from "./ui-controller.mjs";
import { gameController } from "./game-controller.mjs";
import { backgroundController } from "./background-controller.mjs";
import { audioController } from "./audio-controller.mjs";

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
      document.querySelector("#dark-bg").addEventListener("click", uiController.removeHelp);
   };

   const setupHelpNavBtns = () => {
      for (const btn of document.querySelectorAll(".nav-btn")) {
         btn.addEventListener("click", uiController.switchModeDescription);
      }
   };

   const setupSettingsBtnListeners = () => {
      document.querySelector("#settings-btn").addEventListener("click", uiController.toggleSettings);
      document.querySelector("#settings-close").addEventListener("click", () => {
         uiController.removeSelectList();
         uiController.toggleSettings();
      });
      document.querySelector("#dark-bg").addEventListener("click", uiController.removeSettings);
      document.querySelector("#settings-btn-background").addEventListener("click", () => {
         uiController.removeSelectList();
         uiController.showBackgroundSettings();
      });
      document.querySelector("#settings-btn-audio").addEventListener("click", uiController.showAudioSettings);
   };

   const setupBackgroundBtnListeners = () => {
      document.querySelectorAll(".bg-btn").forEach((btn, i) => {
         btn.addEventListener("click", () => {
            backgroundController.changeBackground(`bg${i + 1}`);
            document.querySelectorAll(".bg-btn").forEach((btn) => btn.classList.remove("selected"));
            btn.classList.add("selected");
         });
      });
   };

   const setupToggleSwitchBtnListeners = () => {
      document.querySelector(".audio-type.music .toggle-switch").addEventListener("click", (evt) => {
         uiController.toggleSwitch(evt.currentTarget);
         if (evt.currentTarget.classList.contains("on")) audioController.playMusic();
         else audioController.pauseMusic();
      });
      document.querySelector(".audio-type.sfx .toggle-switch").addEventListener("click", (evt) => {
         uiController.toggleSwitch(evt.currentTarget);
         if (evt.currentTarget.classList.contains("on")) audioController.turnOnSfx();
         else audioController.turnOffSfx();
      });
   };

   const setupSelectListeners = () => {
      document.querySelectorAll(".select").forEach((btn) =>
         btn.addEventListener("click", (evt) => {
            uiController.showSelectList(evt.currentTarget);
         })
      );
      document.querySelectorAll(".select li").forEach((btn, i) =>
         btn.addEventListener("click", (evt) => {
            audioController.setMusic(i);
            evt.currentTarget.parentElement.parentElement.childNodes[0].nodeValue = evt.currentTarget.innerText;
         })
      );
   };

   const setupVolumeListeners = () => {
      document
         .querySelector("#music-volume")
         .addEventListener("input", (evt) => audioController.setMusicVolume(evt.currentTarget.value / 100));
      document
         .querySelector("#sfx-volume")
         .addEventListener("input", (evt) => audioController.setSfxVolume(evt.currentTarget.value / 100));
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
         gameController.startGame(gameController.getCurrentLevelNumber());
      });
   };

   const setupLevelBtnListeners = () => {
      for (const btn of document.querySelectorAll(".level")) {
         const levelNumber = parseInt(btn.textContent);
         btn.addEventListener("click", () => {
            uiController.showLevelDetails(gameController.getLevelData(levelNumber));
            gameController.setCurrentLevelNumber(levelNumber);
         });
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

   const setupPlayAgainBtnListener = () => {
      document.querySelector("#play-again-btn").addEventListener("click", uiController.playAgain);
   };

   const setupNextLevelBtnListener = () => {
      document.querySelector("#next-level-btn").addEventListener("click", uiController.nextLevel);
   };

   const setupTryAgainBtnListener = () => {
      document.querySelector("#try-again-btn").addEventListener("click", uiController.tryAgain);
   };

   const setupEventListeners = () => {
      setupShowPlayBtnListener();
      setupHomeBtnListener();
      setupPlayBtnListeners();
      setupHelpBtnListeners();
      setupHelpNavBtns();
      setupSettingsBtnListeners();
      setupToggleSwitchBtnListeners();
      setupBackgroundBtnListeners();
      setupSelectListeners();
      setupVolumeListeners();
      setupShowGameBtnsListener();
      setupShowGameModesListener();
      setupStartGameModeListeners();
      setupCategorySelectorListeners();
      setupStartGameListeners();
      setupLevelBtnListeners();
      setupAnswerListeners();
      setupBackBtnListener();
      setupQuitBtnListener();
      setupPlayAgainBtnListener();
      setupNextLevelBtnListener();
      setupTryAgainBtnListener();
   };

   return {
      setupEventListeners: setupEventListeners,
   };
})();
