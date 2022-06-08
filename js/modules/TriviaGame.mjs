export class TriviaGame {
   #questions;
   #questionIndex;
   #currentQuestion;

   constructor(questions) {
      this.#questions = questions;
      this.#questionIndex = 0;
      this.#currentQuestion = this.#questions[this.#questionIndex];
      this.score = 0;
      this.numWrong = 0;
   }

   setQuestions(questions) {
      this.#questions = questions;
   }

   getQuestionIndex() {
      return this.#questionIndex;
   }

   setQuestionIndex(index) {
      this.#questionIndex = index;
   }

   getCurrentQuestion() {
      return this.#currentQuestion;
   }

   nextQuestion() {
      this.#currentQuestion = this.#questions[++this.#questionIndex];
   }

   noMoreQuestions() {
      return this.#questionIndex === this.#questions.length;
   }

   increaseScore() {
      this.score++;
   }

   getScore() {
      return this.score;
   }

   increaseNumWrong() {
      this.numWrong++;
      console.log(`Num Wrong: ${this.numWrong}`);
   }
}
