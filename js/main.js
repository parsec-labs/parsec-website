(function($){

  $(document).ready(function(e){
    console.log("Test");

    inview = inView('section')
      .on('enter', el => {
        $(el).addClass('in-view');
      })
      .on('exit', el => {
          $(el).removeClass('in-view');
          if($('section.in-view').hasClass('section-white') || $('section.in-view').hasClass('section-grey')){
            $("body").addClass('light-bg');
          }else{
            $("body").removeClass('light-bg');
          }
      });
    inView.offset(250);

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


  })



})(jQuery)
