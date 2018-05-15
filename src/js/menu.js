(() => {
  const menuButton = document.querySelector('.top-header-menu button');
  const menuList = document.querySelector('.top-header-menu ul');
  const header = document.querySelector('.top-header');
  const sections = document.querySelector('.sections');


  if (menuButton && menuList) {
    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      menuList.classList.toggle('st-opened');
    });

    menuList.addEventListener('click', (e) => {
      menuList.classList.remove('st-opened');
    });

    header.addEventListener('click', (e) => {
      menuList.classList.remove('st-opened');
    });

    sections.addEventListener('click', (e) => {
      menuList.classList.remove('st-opened');
    });
  }
})();