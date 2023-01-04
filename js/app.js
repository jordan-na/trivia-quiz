import { eventHandler } from "./modules/event-handler.mjs";
import { gameController } from "./modules/game-controller.mjs";
import { animationDelayController } from "./modules/animation-delay-controller.mjs";
import { backgroundController } from "./modules/background-controller.mjs";

const init = () => {
   backgroundController.initBackground();
   animationDelayController.setupLevelBtnsAnimationDelays();
   eventHandler.setupEventListeners();
   gameController.initLevels();
};

window.onload = init;