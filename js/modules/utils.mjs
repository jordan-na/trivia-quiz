export const utils = (() => {
   const shuffleArr = (arr) => {
      let currentIndex = arr.length;
      let randomIndex;
      while (currentIndex != 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex--;
         [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
      }
      return arr;
   };

   const decodeEntities = (() => {
      const element = document.createElement("div");
      function decodeHTMLEntities(str) {
         if (str && typeof str === "string") {
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = "";
         }
         return str;
      }
      return decodeHTMLEntities;
   })();

   const wrapSpChars = (text) => {
      text = decodeEntities(text);
      let newText = "";
      for (let i = 0; i < text.length; i++) {
         if (`""''!-+():/#$%°&*=[]^`.indexOf(text.charAt(i)) !== -1) {
            newText += `<span class="sp-ch">${text.charAt(i)}</span>`;
         } else {
            newText += text.charAt(i);
         }
      }
      return newText;
   };

   return {
      shuffleArr: shuffleArr,
      wrapSpChars: wrapSpChars,
   };
})();
