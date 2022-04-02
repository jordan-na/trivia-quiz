export const apiHandler = (() => {
   const endpoint = "https://opentdb.com/api.php?amount=10";
   const categories = {
      "general knowledge": 9,
      "books": 10,
      "film": 11,
      "music": 12,
      "musicals & theatres": 13,
      "television": 14,
      "video games": 15,
      "board games": 16,
      "science & nature": 17,
      "computers": 18,
      "mathematics": 19,
      "mythology": 20,
      "sports": 21,
      "geography": 22,
      "history": 23,
      "politics": 24,
      "art": 25,
      "celebrities": 26,
      "animals": 27,
      "vehicles": 28,
      "comics": 29,
      "gadgets": 30,
      "anime & manga": 31,
      "cartoon & animation": 32
   }

   const getQuestions = async (category) => {
      category = category.toLowerCase();
      if (!category || category === "random") {
         const data = await apiCall(endpoint);
         return data.results;
      }
      const categoryIndex = categories[category];
      if (!categoryIndex) return;
      const categoryEndpoint = `${endpoint}&category=${categoryIndex}`;
      const data = await apiCall(categoryEndpoint);
      return data.results;
   };

   const apiCall = async (endpoint) => {
      return await fetch(endpoint)
         .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res;
         })
         .then((res) => res.json())
         .catch((err) => console.log(err));
   };

   return {
      getQuestions: getQuestions,
      apiCall: apiCall,
   };
})();
