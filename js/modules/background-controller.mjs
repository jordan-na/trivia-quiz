export const backgroundController = (() => {
   const initBackground = () => {
      const bg = localStorage.getItem("trivia-quiz__background");
      changeBackground(bg ? bg : "bg1");
   };

   const changeBackground = (backgroundClass) => {
      document.querySelector("#game-container").className = backgroundClass;
   };

   return {
      initBackground: initBackground,
      changeBackground: changeBackground
   }
})();