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
  })

})(jQuery)
