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
  const preloader = document.getElementById('preloader');
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

const preloadAll = () => {
  const promiseArr = [];

  document.querySelectorAll('[data-src]').forEach((item) => {
    promiseArr.push(preloadSRC(item));
  });
  if (promiseArr.length === 0) return removePreloader();
  Promise.all(promiseArr)
    .then(() => {
      removePreloader();
    })
    .catch((error) => {
      console.error('Error preloading videos', error);
    });
};

preloadAll();
