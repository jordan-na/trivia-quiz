import { eventHandler } from "./modules/event-handler.mjs";
import { triviaGame } from "./modules/trivia-game.mjs";

const init = () => {
   eventHandler.setupEventListeners();
   triviaGame.initLevels();
}

window.onload = init;

// https://opentdb.com/api_config.php

// const makeLevelJsonFile = async () => {
//    const obj = {
//       levels: []
//    };
//    for(let i = 71; i <= 100; i++) {
//       const data = await apiHandler.apiCall("https://opentdb.com/api.php?amount=10&difficulty=easy");
//       const level = {
//          levelNumber: i,
//          difficulty: "hard",
//          questions: [...data.results]
//       }
//       obj.levels.push(level);
//    }
//    console.log(JSON.stringify(obj));
// };