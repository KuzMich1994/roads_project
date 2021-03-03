import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import '../index.html';
import '../css/style.css';
import '../sass/style.sass';
import '../img/Logo.svg';
import '../img/main-bg-2.png';
import '../img/dots-1.svg';
import '../img/general-bg.png';
import '../img/general-dots.svg';
import '../img/signs-1.png';
import '../img/signs-2.png';
import '../img/signs-3.png';
import '../img/signs-4.png';
import '../img/signs-5.png';
import '../img/signs-button.svg';
import '../img/discount-bg.png';
import '../img/location-1.jpg';
import '../img/location-2.jpg';
import '../img/location-3.jpg';
import '../img/location-4.jpg';
import showMobileMenu from './modules/showMobileMenu';
import sendForm from './modules/sendForm';
import showTextOnBanner from './modules/showTextOnBanner';
// import toggleTabs from './modules/toggleTabs';
import scrollToBlock from './modules/scrollToBlock';

const swiper = new Swiper('.signs__slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  breakpoints: {
    1921: {
      spaceBetween: 0,
      width: 1920
    },
    1201: {
      spaceBetween: 20,
      slidesPerView: 4
    },
    769: {
      spaceBetween: 20,
      width: 1350
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
      width: 510
    }
  },

  // If we need pagination
  pagination: {
    el: '.signs__pagination',
    bulletClass: 'signs__bullet',
    bulletActiveClass: 'signs__bullet_active',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.signs__button-next',
    prevEl: '.signs__button-prev',
  },
});
const swiper2 = new Swiper('.location__slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  breakpoints: {
    1921: {
      slidesPerView: 3,
      spaceBetween: 20,
      width: 1920
    },
    1201: {
      spaceBetween: 20,
    },
    769: {
      spaceBetween: 20,
      slidesPerView: 4,
      width: 1507
    },
    320: {
      spaceBetween: 10,
      slidesPerView: 2,
      width: 510
    }
  },

  // If we need pagination
  pagination: {
    el: '.location__pagination',
    bulletClass: 'location__bullet',
    bulletActiveClass: 'location__bullet_active',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.location__button-next',
    prevEl: '.location__button-prev',
  },
});

swiper.init();
swiper2.init();

showMobileMenu();
sendForm();
showTextOnBanner();
// toggleTabs();
scrollToBlock();
