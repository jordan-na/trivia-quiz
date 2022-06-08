import { eventHandler } from "./modules/event-handler.mjs";
import { gameController } from "./modules/game-controller.mjs";
import { animationDelayController } from "./modules/animation-delay-controller.mjs";

const init = () => {
   animationDelayController.setupLevelBtnsAnimationDelays();
   eventHandler.setupEventListeners();
   gameController.initLevels();
};

window.onload = init;