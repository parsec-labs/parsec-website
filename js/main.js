(function($){
// Dude loves closures

  var inview;

  $(document).ready(function(e){

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        console.log("FUCKER");
        $('html, body').animate({
          scrollTop: (target.offset().top - 112)
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
          // $(el).removeClass('in-view');
          if($('.section.in-view').hasClass('section-white') || $('.section.in-view').hasClass('section-grey')){
            $("body").addClass('light-bg');
          }else{
            $("body").removeClass('light-bg');
          }
      });
    inView.offset(250);

  })

  function register($form) {
    $.ajax({
      type: "GET",
      url: $form.attr('action'),
      data: $form.serialize(),
      cache       : false,
      dataType    : 'jsonp',
      contentType : "application/json; charset=utf-8",
      beforeSend  : function() {
  			$form.find('.alert').html('Subscribing...').show();
  			$form.find('.email').hide();
  			$form.find('.submit').hide();
  			$form.find('.discount').hide();
  		},
      error       : function(err) {
  			$form.find('.alert').html('Ops, there was an error.').show();
  			$form.find('.email').show();
  			$form.find('.submit').show();
  			$form.find('.discont').show();
      },
      success     : function(data) {
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
      try {
        //define argument as the current form especially if you have more than one
        var $form = $(this);
        // stop open of new tab
        event.preventDefault();
        // submit form via ajax
        register($form);
      } catch(error){}
    });


})(jQuery)
