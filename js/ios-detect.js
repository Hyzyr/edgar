const isIOS = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

if (isIOS()) {
  console.log('ios device');
  document.querySelector('.preloader').innerHTML = `
      <div class="preloader__note">
        <span>Please visit this website from a desktop for the best experience.</span>
     </div>
    `;
  document
    .querySelectorAll('.pageintro,.main')
    .forEach((section) => section.remove());
} else {
  document.querySelectorAll('script').forEach((script) => {
    if (script.dataset.src) script.src = script.dataset.src;
  });
}
