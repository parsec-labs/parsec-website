(function(){
  const header = document.querySelector('.header');
  window.initCosmos(header.querySelector('.header-bg'), () => {
    const rect = header.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  });

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

  const easeOutCubic = t => (--t) * t * t + 1;
  let scrollInterval;
  document.addEventListener('click', (e) => {
    if (e.target.dataset && e.target.dataset.target && e.target.tagName === 'A') {
      e.preventDefault();
      const section = document.querySelector(`[data-section="${e.target.dataset.target}"]`);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;

        if (scrollInterval) {
          clearInterval(scrollInterval);
          scrollInterval = null;
        }
        const frameInterval = 1000 / 60;
        const duration = 600;
        const scrollY = window.scrollY;
        const startTime = Date.now();
        const delta = top - window.scrollY;
        const updater = (...args) => {
          const passed = easeOutCubic((Date.now() - startTime) / duration);
          window.scrollTo(0, scrollY + delta * passed);
          if (Date.now() - startTime < duration) {
            scrollInterval = setTimeout(updater, frameInterval);
          } else {
            window.scrollTo(0, top);
          }
        };
        scrollInterval = setTimeout(updater, frameInterval);
      }
    }
  });

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
    benefitsTabs.addEventListener('click', (e) => {
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
})();
