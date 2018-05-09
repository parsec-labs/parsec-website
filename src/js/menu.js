(() => {
  const menuButton = document.querySelector('.top-header-menu button');
  const menuList = document.querySelector('.top-header-menu ul');
  if (menuButton && menuList) {
    menuButton.addEventListener('click', () => {
      menuList.classList.toggle('st-opened');
    });
  }
})();