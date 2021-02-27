const toggleTabs = () => {
  const tab = document.querySelectorAll('.price__table-tab');
  const tabs = document.querySelector('.price__table-tabs');
  const grids = document.querySelectorAll('.price__table-grid');

  const toggleTabContent = index => {
    for (let i = 0; i < tab.length; i++) {
      if (index === i) {
        tab[i].classList.add('price__table-tab_active');
        grids[i].classList.add('price__table-grid_active');
        grids[2].style.height = '280px';
      } else {
        tab[i].classList.remove('price__table-tab_active');
        grids[i].classList.remove('price__table-grid_active');
        grids[2].style.height = '613px';
      }
    }
  };

  tabs.addEventListener('click', e => {
    let target = e.target;
    target = target.closest('.price__table-tab');

    if (target) {
      tab.forEach((elem, i) => {
        if (elem === target) {
          toggleTabContent(i);
        }
      });
    }
  });
};

export default toggleTabs;
