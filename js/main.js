(function($){
// Dude loves closures

  var inview;

  $(document).ready(function(e){

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#navigation',
    offset: 54
  });

    if(isMobile.any){
        $('body').addClass('mobile-device');
    }else{
        $('.navbar-collapse').removeClass('collapse');
    }

    inview = inView('.section')
      .on('enter', el => {
        $(el).addClass('in-view');
      })
      .on('exit', el => {
          $(el).removeClass('in-view');
          if($('.section.in-view').hasClass('section-white') || $('.section.in-view').hasClass('section-grey')){
            $("body").addClass('light-bg');
          }else{
            $("body").removeClass('light-bg');
          }
      });
    inView.offset(250);

  })

})(jQuery)
