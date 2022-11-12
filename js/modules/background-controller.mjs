export const backgroundController = (() => {
   const changeBackground = (backgroundClass) => {
      document.querySelector("#game-container").className = backgroundClass;
   };

   return {
      changeBackground: changeBackground
   }
})();