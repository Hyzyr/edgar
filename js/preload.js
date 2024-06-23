const preloader = document.getElementById('preloader');
const preloaderText = document.getElementById('preloader-text');
const preloaderProgress = document.getElementById('preloader-progress');
const preloaderBtn = document.getElementById('preloader-btn');
const preloaderAudio = document.getElementById('preloader-audio');

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

const showButton = (whenDone) => {
  preloaderBtn.classList.add('active');
  preloaderBtn.onclick = () => {
    gsap
      .timeline()
      .to(
        preloader.querySelectorAll(
          '.preloader__image,.preloader__progress,.preloader__button'
        ),
        { display: 'none', duration: 0 }
      )
      .to(preloader.querySelector('.preloader__title'), {
        display: 'block',
        duration: 0,
      })
      .fromTo(
        preloader.querySelectorAll('.preloader__title > img'),
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, delay: 0.4, stagger: 0.2 }
      )
      .to(
        preloaderAudio,
        {
          duration: 1,
          onStart: () => preloaderAudio.play(),
          onComplete: () => {
            removePreloader();
            whenDone();
          },
        },
        '<'
      );
  };
};
const promiseData = { percentage: 0 };
const runPromises = async (promises, whenDone) => {
  let completed = 0;
  const total = promises.length;
  console.log('length', promises.length);

  const timeline = gsap.timeline();

  const onPromiseComplete = () => {
    completed++;
    const percentComplete = Math.round((completed / total) * 100);
    timeline.to(promiseData, {
      percentage: percentComplete,
      duration: 0.13,
      onUpdate: () => {
        let updatePercentage = Math.round(promiseData.percentage);
        gsap.set(preloaderProgress, { width: `${updatePercentage}%` });
        preloaderText.innerText = `${updatePercentage}%`;

        if (percentComplete === 100) {
          showButton(whenDone);
        }
      },
    });
  };

  for (const promise of promises) {
    promise.then(onPromiseComplete);
  }

  await Promise.all(promises);
};

const emptyPromise = new Promise((resolve) => resolve());

const preloadAll = async (whenDone = () => {}) => {
  const promiseArr = [emptyPromise];

  document.querySelectorAll('[data-src]').forEach((item) => {
    promiseArr.push(preloadSRC(item));
  });
  if (promiseArr.length === 0) {
    console.log('nothing to load removing preloader');
    whenDone();
    removePreloader();
    return;
  }

  runPromises(promiseArr, whenDone)
    .then(() => {
      isDone = true;
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.error('Error preloading videos', error);
    });
};
