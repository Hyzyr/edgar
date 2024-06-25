const init = () => {
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

  const copy = (text, e) => {
    // let target = e.currentTarget;
    // let messageObj = target.querySelector('.transaction__inner-body-tooltip');

    if (navigator.clipboard !== undefined) {
      //Chrome
      navigator.clipboard
        .writeText(text)
        .then
        // () => showCopyText(messageObj, 'Copied'),
        // (err) => console.error('Async: Could not copy text: ', err)
        ();
    } else if (window.clipboardData) {
      // Internet Explorer
      window.clipboardData.setData('Text', text);
    } else {
      // showCopyText(messageObj, 'Error: not secure');
    }
  };
  document.querySelectorAll('.copy-text').forEach((element) => {
    element.onclick = () => copy(element.innerText);
  });
};

if (isIOS && !isIOS()) {
  console.log('not ios device');

  initPin();
  init();
}
