const mainBg = document.getElementById('main-bg');
const mainMusic = document.getElementById('main-music');
const mainEdgar = document.getElementById('main-edgar');

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
