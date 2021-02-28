const scrollToBlock = () => {
  const links = document.querySelectorAll('[href*="#"]');
  links.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      const blockId = target.getAttribute('href').substring(1);
      document.getElementById(blockId).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    });
  });
};

export default scrollToBlock;
