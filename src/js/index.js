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
import '../img/signs-slide.svg';
import '../img/signs-button.svg';
import showMobileMenu from './modules/showMobileMenu';
import sendForm from './modules/sendForm';
import showTextOnBanner from './modules/showTextOnBanner';

const swiper = new Swiper('.signs__slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4,
  breakpoints: {
    1201: {
      spaceBetween: 20,
      slidesPerView: 4
    },
    769: {
      spaceBetween: -450
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 0
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
    1201: {
      spaceBetween: 20,
    },
    769: {
      spaceBetween: 20,
    },
    320: {
      spaceBetween: 0,
      slidesPerView: 1
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

