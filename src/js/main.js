(function($){

  $(document).ready(function(e){
    const inview = window.inView('section')
      .on('enter', el => $(el).addClass('in-view'))
      .on('exit', el => $(el).removeClass('in-view'));
    window.inView.offset(250);

    function register($form) {
      $.ajax({
        type: "GET",
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        beforeSend: function() {
          $form.find('.alert').html('Subscribing...').show();
          $form.find('.email').hide();
          $form.find('.submit').hide();
          $form.find('.discount').hide();
        },
        error: function(err) {
          $form.find('.alert').html('Ops, there was an error.').show();
          $form.find('.email').show();
          $form.find('.submit').show();
          $form.find('.discont').show();
        },
        success: function(data) {
          if (data.result != "success") {
            $form.find('.alert').html(data.msg).show();
            $form.find('.email').show();
            $form.find('.submit').show();
            $form.find('.discont').show();
          } else {
            $form.find('.alert').html('Thank you!').show();
          }
        }
      });
    }

    // waits for form to appear rather than appending straight to the form. Also helps if you have more than one type of form that you want to use this action on.
    $(document).on('submit', '#mc-embedded-subscribe-form', function(event) {
      //define argument as the current form especially if you have more than one
      const $form = $(event.currentTarget);
      // stop open of new tab
      event.preventDefault();
      // submit form via ajax
      register($form);
    });
  });

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
  })
})(jQuery)
