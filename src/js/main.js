$(document).foundation({
  equalizer : {
    // Specify if Equalizer should make elements equal height once they become stacked.
    equalize_on_stack: false
  }
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      window.console.log(target);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 125
        }, 1000);
        return false;
      }
    }
  });
});

$(window).on('load', function (e){
  if (window.location.hash) {
    $('html, body').animate({
      scrollTop: $(window.location.hash).offset().top - 125
    }, 1000);
  }
});