(() => {
  const menuButton = document.querySelector('.top-header-menu button');
  const menuList = document.querySelector('.top-header-menu ul');
  const header = document.querySelector('.top-header');
  const sections = document.querySelector('.sections');

  if (menuButton && menuList) {
    menuButton.addEventListener('click', e => {
      e.stopPropagation();
      menuList.classList.toggle('st-opened');
    });

    menuList.addEventListener('click', e => {
      menuList.classList.remove('st-opened');
    });

    header.addEventListener('click', e => {
      menuList.classList.remove('st-opened');
    });

    sections.addEventListener('click', e => {
      menuList.classList.remove('st-opened');
    });
  }
})();

// Navbar-fixed top
const topHeader = document.querySelector('.top-header');
window.addEventListener('scroll', () => {
  const topOffset = 0 - Math.min(20, window.scrollY);
  topHeader.style.top = `${topOffset}px`;

  const scrolled = topHeader.classList.contains('st-scrolled');
  if (window.scrollY >= 20) {
    if (!scrolled) {
      topHeader.classList.add('st-scrolled');
    }
  } else if (scrolled) {
    topHeader.classList.remove('st-scrolled');
  }
});

// Changing tabs in benefits
const benefitsTabs = document.querySelector('.benefits');
if (benefitsTabs) {
  const hidePanes = () => {
    Array.from(benefitsTabs.querySelectorAll('.tab-pane')).forEach(pane => {
      pane.classList.remove('show');
      pane.classList.remove('active');
    });
  };
  const resetTabs = () => {
    Array.from(benefitsTabs.querySelectorAll('.nav-link')).forEach(tab => {
      tab.classList.remove('active');
    });
  };
  benefitsTabs.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');

      hidePanes();
      const pane = document.querySelector(href);
      pane.classList.add('show');
      pane.classList.add('active');

      resetTabs();
      e.target.classList.add('active');
    }
  });
}

// Showing the line And Changing "Plus/Minus Sign"
const area = document.querySelector('.accordion');
const area1 = document.querySelector('.accordion1');
const area2 = document.querySelector('.accordion2');

function l(e) {
  if (e.target.classList.contains('collapsed')) {
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.add('line'),
      e.target.parentElement.parentElement.parentElement.classList.add('border_click'),
      e.target.classList.add('btn-link-color'),
      (e.target.nextElementSibling.className = 'minus');
    }, 50);
  } else if (e.target.classList.contains('btn-link-color')) {
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.remove('line'),
      e.target.parentElement.parentElement.parentElement.classList.remove('border_click'),
      e.target.classList.remove('btn-link-color'),
      (e.target.nextElementSibling.className = 'more');
    }, 200);
  }
  e.preventDefault();
}

function l1(e) {
  if (e.target.classList.contains('collapsed')) {
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.add('line'),
      e.target.parentElement.parentElement.parentElement.classList.add('border_click'),
      e.target.classList.add('btn-link-color'),
      (e.target.nextElementSibling.className = 'minus');
    }, 50);
  } else if (e.target.classList.contains('btn-link-color')) {
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.remove('line'),
      e.target.parentElement.parentElement.parentElement.classList.remove('border_click'),
      e.target.classList.remove('btn-link-color'),
      (e.target.nextElementSibling.className = 'more');
    }, 200);
  }
  e.preventDefault();
}

function l2(e) {
  if (e.target.classList.contains('collapsed')) {
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.add('line'),
      e.target.parentElement.parentElement.parentElement.classList.add('border_click'),
      e.target.classList.add('btn-link-color'),
      (e.target.nextElementSibling.className = 'minus');
    }, 50);
  } else if (e.target.classList.contains('btn-link-color')) {
    setTimeout(() => {
      e.target.parentElement.parentElement.classList.remove('line'),
      e.target.parentElement.parentElement.parentElement.classList.remove('border_click'),
      e.target.classList.remove('btn-link-color'),
      (e.target.nextElementSibling.className = 'more');
    }, 200);
  }
  e.preventDefault();
}

function lEL()  { area.addEventListener('mouseup', l);   }
function lEL1() { area1.addEventListener('mouseup', l1); }
function lEL2() { area2.addEventListener('mouseup', l2); }
lEL();
lEL1();
lEL2();
