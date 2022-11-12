export const audioController = (() => {

   let playing = false;

   const music = [
      new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/peaceful.mp3"),
      new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/intense.wav"),
      new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/focused.wav"),
      new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/techno.wav"),
      new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/safari.wav"),
   ];

   music.forEach(m => {
      m.loop = true;
      m.volume = 0.5;
   })

   let musicIndex = 0;

   const winSfx = new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/win.wav");
   winSfx.volume = 0.5;
   winSfx.muted = true;
   const loseSfx = new Audio("https://cdn.jsdelivr.net/gh/jordan-na/trivia-quiz@main/assets/audio/lose.wav");
   loseSfx.volume = 0.5;
   loseSfx.muted = true;

   const setMusic = (index) => {
      pauseMusic();
      musicIndex = index;
      if(playing) {
         music[musicIndex].play();
      }
   };

   const playMusic = () => {
      music[musicIndex].play();
      playing = true;
   };

   const pauseMusic = () => {
      music[musicIndex].pause();
   };

   const setMusicVolume = (volume) => {
      music.forEach(m => m.volume = volume);
   };

   const turnOffSfx = () => {
      winSfx.muted = true;
      loseSfx.muted = true;
   }

   const turnOnSfx = () => {
      winSfx.muted = false;
      loseSfx.muted = false;
   };

   const setSfxVolume = (volume) => {
      winSfx.volume = volume;
      loseSfx.volume = volume;
   };

   const playWinSound = () => {
      winSfx.play();
   };

   const playLoseSound = () => {
      loseSfx.play();
   };

   return {
      setMusic: setMusic,
      playMusic: playMusic,
      pauseMusic: pauseMusic,
      setMusicVolume: setMusicVolume,
      turnOffSfx: turnOffSfx,
      turnOnSfx: turnOnSfx,
      setSfxVolume: setSfxVolume,
      playWinSound: playWinSound,
      playLoseSound: playLoseSound
   }
})();