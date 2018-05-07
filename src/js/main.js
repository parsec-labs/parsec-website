(function($){
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

  document.addEventListener('click', (e) => {
    if (e.target.dataset && e.target.dataset.target && e.target.tagName === 'A') {
      e.preventDefault();
      const section = document.querySelector(`[data-section="${e.target.dataset.target}"]`);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;

        // ToDo: replace jQuery here
        $('html, body').animate({
          scrollTop: top,
        })
      }
    }
  });
})(jQuery);
