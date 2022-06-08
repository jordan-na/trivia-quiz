import { TriviaGame } from "./TriviaGame.mjs";

export class TriviaGameLevel extends TriviaGame {
   static #easyPassingScore = 5;
   static #mediumPassingScore = 6;
   static #hardPassingScore = 8;
   #passingScore;

   constructor(questions, difficulty) {
      super(questions);
      if (difficulty === "easy") {
         this.#passingScore = TriviaGameLevel.#easyPassingScore;
      } else if (difficulty === "medium") {
         this.#passingScore = TriviaGameLevel.#mediumPassingScore;
      } else if (difficulty === "hard") {
         this.#passingScore == TriviaGameLevel.#hardPassingScore;
      }
   }

   passed() {
      return this.score >= this.#passingScore;
   }

   getPassingScore() {
      return this.#passingScore;
   }

   static getPassingScoreByDifficulty(difficulty) {
      if (difficulty === "easy") return TriviaGameLevel.#easyPassingScore;
      else if (difficulty === "medium") return TriviaGameLevel.#mediumPassingScore;
      else if (difficulty === "hard") return TriviaGameLevel.#hardPassingScore;
   }
}
