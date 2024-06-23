const main = document.getElementById('main');
const mainBg = document.getElementById('main-bg');
const mainMusic = document.getElementById('main-music');
const mainEdgar = document.getElementById('main-edgar');
const muteButton = document.getElementById('button-mute');

const afterPreload = () => {
  initPageIntro({
    afterTapAnimation: () => {
      ScrollTrigger.refresh();
      mainBg.play();
      mainEdgar.play();
      mainMusic.play();
      document.body.style = 'overflow: unset';
    },
  });
};
preloadAll(afterPreload);

const muteAll = (mute = true) =>
  document.querySelectorAll('video, audio').forEach((item) => {
    item.muted = mute;
  });

muteButton.onclick = () => {
  let isMuted = muteButton.classList.contains('off');

  muteAll(!isMuted);
  muteButton.classList.toggle('off', !isMuted);
};

window.addEventListener('blur', () => {
  muteAll();
});
window.addEventListener('focus', () => {
  if (!muteButton.classList.contains('off')) muteAll(false);
});
