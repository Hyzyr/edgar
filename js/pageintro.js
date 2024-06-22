const pageIntroWrapper = document.querySelector('.pageintro');
const pageIntorBgVid = document.getElementById('pageintro-bg-vidio');
const pageIntorTranVid = document.getElementById('pageintro-transition-vidio');

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
  initTimeline
    .to(caseDrop, {
      display: 'flex',
      duration: 1,
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
    })
    .to(caseOpen, {
      display: 'none',
      duration: 0,
    })
    .to(
      pageIntorBgVid,
      {
        opacity: 0,
        volume: 0,
        duration: 1,
        onComplete: () => {
          pageIntorBgVid.stop();
        },
      },
      '<-0.3'
    )
    .to(
      pageIntorTranVid,
      {
        duration: 0,
        onComplete: () => {
          pageIntorTranVid.play();
        },
      },
      '<=0.2'
    )
    .to(
      pageIntorTranVid,
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
  pageIntorBgVid.play();
  initCase();
  // pageIntroWrapper.dataset.init = 'true';
  pageIntroWrapper.onclick = () => {
    removeIntro(afterTapAnimation);
  };
};
