export const animationDelayController = (() => {
   const setupLevelBtnsAnimationDelays = () => {
      const levelBtns = document.querySelectorAll(".level");
      for(let i = 0; i < levelBtns.length; i++) {
         levelBtns[i].style.animationDelay = `${i/45}s`;
      }
   };

   return {
      setupLevelBtnsAnimationDelays: setupLevelBtnsAnimationDelays
   }
})();