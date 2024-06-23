const pageIntroWrapper = document.querySelector('.pageintro');
const pageIntroBgVid = document.getElementById('pageintro-bg-vidio');
const pageIntroTranVid = document.getElementById('pageintro-transition-vidio');

const chestOpenSound = document.getElementById('chest-open-sound');
const chestDropSound = document.getElementById('chest-drop-sound');

const caseDrop = pageIntroWrapper?.querySelector('._case-drop') || null;
const caseOpen = pageIntroWrapper?.querySelector('._case-open') || null;
const caseIdle = pageIntroWrapper?.querySelector('._case-idle') || null;

let initTimeline = null;

const caseStates = {
  drop: caseDrop,
  open: caseOpen,
  idle: caseIdle,
};

const toggleCaseState = (stateKey) => {
  Object.values(caseStates).forEach((state) => {
    state.style.display = 'none';
  });
  if (caseStates[stateKey]) caseStates[stateKey].style.display = 'flex';
};
const initCase = () => {
  toggleCaseState(null);

  initTimeline = gsap.timeline();
  chestDropSound.play();
  initTimeline
    .to(caseDrop, {
      display: 'flex',
      duration: 1,
      delay: 0.7,
    })
    .to(caseDrop, {
      display: 'none',
      duration: 0,
    })
    .to(caseIdle, {
      display: 'flex',
      duration: 1,
    })
    .play();
};
const removeIntro = (_callback) => {
  initTimeline.clear();
  toggleCaseState(null);
  let timeline = gsap.timeline();
  pageIntroWrapper.onclick = null;
  timeline
    .to(caseIdle, {
      display: 'none',
      duration: 0,
    })
    .to(caseOpen, {
      display: 'flex',
      duration: 0.85,
      onStart: () => chestOpenSound.play(),
    })
    .to(caseOpen, {
      display: 'none',
      duration: 0,
    })
    .to(
      pageIntroBgVid,
      {
        opacity: 0,
        volume: 0.12,
        duration: 1,
        onComplete: () => {
          if (pageIntroBgVid?.stop) pageIntroBgVid.stop();
        },
      },
      '<-0.3'
    )
    .to(
      pageIntroTranVid,
      {
        duration: 0,
        onComplete: () => {
          pageIntroTranVid.play();
        },
      },
      '<=0.2'
    )
    .to(
      pageIntroTranVid,
      {
        duration: 2.2,
        onComplete: () => {
          pageIntroWrapper.remove();
          timeline.clear();
          if (_callback) _callback();
        },
      },
      '<'
    )
    .play();
};
const initPageIntro = ({ afterTapAnimation }) => {
  pageIntroBgVid.play();
  initCase();
  // pageIntroWrapper.dataset.init = 'true';
  pageIntroWrapper.onclick = () => {
    removeIntro(afterTapAnimation);
  };
};
