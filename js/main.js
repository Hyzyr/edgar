// var menu = document.getElementById("menu");
// var menuBtn = document.getElementById("menuBtn");
// var body = document.body;

// const closeMenu = () => {
//   menu.classList.remove("active");
//   menuBtn.classList.remove("active");
//   body.classList.remove("active");
// };

// menuBtn.onclick = function () {
//   menu.classList.toggle("active");
//   menuBtn.classList.toggle("active");
//   body.classList.toggle("active");
// };
// window.onclick = function (event) {
//   if (event.target == menu) {
//     closeMenu();
//   }
// };

// const header = document.getElementById("header");
// if (header)
//   window.addEventListener("scroll", () => {
//     if (document.documentElement.scrollTop > 400) {
//       header.classList.add("sticky");
//     } else {
//       header.classList.remove("sticky");
//     }
//   });

// ///
// ///
// /// slick slider

// ///
// ///
// /// tabEvents
// const toggleBody = (isClosed) => {
//   if (isClosed) {
//     document.body.classList.add("active");
//     if (menu) closeMenu();
//   } else {
//     document.body.classList.remove("active");
//   }
// };
// document.querySelectorAll(`[data-event="tabEvent"]`).forEach((eventBtn) => {
//   const tab = document.querySelector(eventBtn.getAttribute("data-tab"));
//   if (tab) {
//     eventBtn.onclick = (e) => {
//       e.preventDefault();
//       tab.classList.toggle("active");
//       toggleBody(tab.classList.contains("active"));
//     };
//     tab.onclick = (e) => {
//       if (e.target === e.currentTarget) {
//         tab.classList.toggle("active");
//         toggleBody(tab.classList.contains("active"));
//       }
//     };
//   }
// });
// document.querySelectorAll(`[data-toggle]`).forEach((toggleBtn) => {
//   console.log("btn ->");
//   toggleBtn.onclick = () =>
//     toggleBtn.classList.toggle(toggleBtn.getAttribute("data-toggle"));
// });
// ///
// ///
// ///
// ///WOW JS
// // new WOW().init({
// //   boxClass: "wow",
// // });

const mainBg = document.getElementById('main-bg');
const mainMusic = document.getElementById('main-music');

const afterPreload = () => {
  initPageIntro({
    afterTapAnimation: () => {
      mainBg.play();
      mainMusic.play();
    },
  });
};
preloadAll(afterPreload);
