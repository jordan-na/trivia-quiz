export const backgroundController = (() => {
   const initBackground = () => {
      const bg = localStorage.getItem("trivia-quiz__background");
      if (bg) {
         changeBackground(bg);
         const btnIndex = parseInt(bg.substring(2));
         document.querySelectorAll(".bg-btn").forEach((btn, i) => {
            if (i === btnIndex - 1) btn.classList.add("selected");
         });
      } else {
         changeBackground("bg1");
         document.querySelector(".bg-btn.bg1").classList.add("selected");
      }
   };

   const changeBackground = (backgroundClass) => {
      document.querySelector("#game-container").className = backgroundClass;
   };

   return {
      initBackground: initBackground,
      changeBackground: changeBackground,
   };
})();
