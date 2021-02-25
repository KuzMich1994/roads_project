const showMobileMenu = () => {
  const mobileBtn = document.querySelector('.header__mobile-button');
  const mobileLines = mobileBtn.querySelectorAll('.header__mobile-button-line');
  const mobileMenu = document.querySelector('.header__mobile-menu');
  const mobileOverlay = document.querySelector('.header__mobile-overlay');
  const mobileBtnMask = document.querySelector('.header__mobile-button-mask');

  document.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.header__mobile-button') || target.matches('.header__mobile-button-line')) {
      mobileLines.forEach(item => {
        item.classList.add('header__mobile-button-line_active');
      });
      mobileOverlay.classList.add('header__mobile-overlay_active');
      mobileMenu.classList.add('header__mobile-menu_active');
      mobileBtnMask.classList.add('header__mobile-button-mask_active');
      document.body.style.overflowY = 'hidden';
    }
    if (target.matches('.header__mobile-overlay') || target.matches('.header__link') ||
        target.matches('.header__mobile-button-mask')) {
      mobileLines.forEach(item => {
        item.classList.remove('header__mobile-button-line_active');
      });
      mobileOverlay.classList.remove('header__mobile-overlay_active');
      mobileMenu.classList.remove('header__mobile-menu_active');
      mobileBtnMask.classList.remove('header__mobile-button-mask_active');
      document.body.style.overflowY = 'scroll';
    }
  });

};

export default showMobileMenu;
