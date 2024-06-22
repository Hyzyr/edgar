var isClicked = false;
var isDone = false;
const preloader = document.getElementById('preloader');
const preloaderText = document.getElementById('preloader-text');

const removeItem = (item) => {
  gsap.to(item, {
    opacity: 0,
    pointerEvents: 'none',
    duration: 0.5,
    onComplete: () => {
      item.remove();
    },
  });
};
const removePreloader = () => {
  if (preloader) removeItem(preloader);
};

const preloadSRC = (item) => {
  return new Promise((resolve) => {
    const source = item.dataset.src;
    const request = new XMLHttpRequest();
    request.open('GET', source, true);
    request.responseType = 'blob';

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        item.src = URL.createObjectURL(request.response);
        resolve();
      }
    };

    request.send();
  });
};

const preloadAll = (whenDone = () => {}) => {
  const promiseArr = [];

  if (preloader)
    preloader.addEventListener('click', () => {
      console.log('click true');
      isClicked = true;
      if (isDone) {
        console.log('clicked and downloaded removing preloader');
        removePreloader();
        whenDone();
      }
    });

  document.querySelectorAll('[data-src]').forEach((item) => {
    promiseArr.push(preloadSRC(item));
  });
  if (promiseArr.length === 0) {
    console.log('nothing to load removing preloader');
    whenDone();
    removePreloader();
    return;
  }

  Promise.all(promiseArr)
    .then(() => {
      isDone = true;
      if (isClicked) {
        console.log('everythiong downloaded removing preloader');
        removePreloader();
        whenDone();
      }
    })
    .catch((error) => {
      console.error('Error preloading videos', error);
    });
};
