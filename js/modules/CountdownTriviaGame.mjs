import { TriviaGame } from "./TriviaGame.mjs";
import { apiHandler } from "./api-handler.mjs";
import { uiController } from "./ui-controller.mjs";

const timeElapsed = document.querySelector("#time-elapsed");
const timeAdded = document.querySelector("#total-time-added");
const questionsWrong = document.querySelector("#questions-wrong");
const finalScore = document.querySelector("#final-score");

export class CountDownTriviaGame extends TriviaGame {
   #category;
   #timeLimit;
   #time;
   #timeToAdd;
   #timeElapsed;
   #timeAdded;
   #numTimesAdded;
   #id;

   constructor(questions, category, time, timeToAdd) {
      super(questions);
      this.#category = category;
      this.#timeLimit = time;
      this.#time = time;
      this.#timeToAdd = timeToAdd;
      this.#timeElapsed = 0;
      this.#timeAdded = 0;
      this.#numTimesAdded = 0;
      this.updateTime = this.updateTime.bind(this);
   }

   async resetQuestions() {
      const questions = await apiHandler.getQuestions(this.#category);
      this.setQuestions(questions);
      this.setQuestionIndex(-1);
   }

   startTimer() {
      this.#id = setInterval(this.updateTime, 1000);
   }

   updateTime() {
      if (this.#time === 0) {
         this.stopTimer();
         // Update DOM with time elapsed, time added, questions wrong, and final score
         // Update .game-stats.countdown
         timeElapsed.innerHTML = `${this.#timeElapsed - this.#numTimesAdded}<span class="sub">s<span/>`;
         timeAdded.innerHTML =
            this.#timeAdded === 0
               ? `${this.#timeAdded}<span class="sub">s<span/>`
               : `<span class="sp-ch">+<span/>${this.#timeAdded}<span class="sub">s<span/>`;
         questionsWrong.innerText = `${this.numWrong}`;
         finalScore.innerText = `${this.score}`;
         uiController.showGameFinishScreen("countdown");
         return;
      }
      this.#time--;
      this.#timeElapsed++;
      uiController.setTime(this.#time);
      uiController.updateTimerBar(this.#time, this.#timeLimit);
   }

   stopTimer() {
      clearInterval(this.#id);
   }

   getTime() {
      return this.#time;
   }

   getTimeLimit() {
      return this.#timeLimit;
   }

   getTimeToAdd() {
      return this.#timeToAdd;
   }

   addTime(time) {
      if (!time) {
         this.#time += this.#timeToAdd + 1;
         this.#timeAdded += this.#timeToAdd;
         uiController.addTime(this.#timeToAdd);
      } else {
         this.#time += time + 1;
         this.#timeAdded += time;
         uiController.addTime(time);
      }
      console.log(`Time added: ${this.#timeAdded}`);
      this.#numTimesAdded++;
   }

   getTimeElapsed() {
      return this.#timeElapsed;
   }

   getTimeAdded() {
      return this.#timeAdded;
   }
}
