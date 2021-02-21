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
    768: {
      spaceBetween: -450
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

showMobileMenu();

