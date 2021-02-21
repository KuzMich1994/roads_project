const showMobileMenu = () => {
  const mobileBtn = document.querySelector('.header__mobile-button');
  const mobileLines = mobileBtn.querySelectorAll('.header__mobile-button-line');
  const mobileMenu = document.querySelector('.header__mobile-menu');

  mobileBtn.addEventListener('click', e => {
    mobileLines.forEach(item => {
      item.classList.toggle('header__mobile-button-line_active')
    })
    mobileMenu.classList.toggle('header__mobile-menu_active');
  });
  
};

export default showMobileMenu;