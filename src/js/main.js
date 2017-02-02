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

$(document).ready(function() {
  var params = window.location.search.substring(1);
  if (params.indexOf('thanks') > -1 ) {
    $('#message').show();
    setTimeout(function(){ 
      $('#message').fadeOut('slow');
    }, 4000);
  }

  $( "#site-search-form").on('click', function () {
    $(this).addClass('active');
    $submit = $(this).find('input[type="submit"]');
  });

  $(document).on('ready', function(){
    $.ajax({
      type: "GET",
      url: "http://important-chickpea.cloudvent.net/hi-accounting/index.json",
      success: function(result){
        window.console.log('success');
        for(var i=0; i<result.length; i++) {
          var new_post = $('.post').clone();
          window.console.log(new_post);
          var post_content = result[i].excerpt;
          post_content = $("<div />").html(post_content).text();
          new_post.find('.post-title').text(result[i].title).end()
                  .find('.post-date').text(result[i].date).end()
                  .find('.post-content').append(post_content).end()
                  .find('.post-link').attr('href', result[i].url);
          $('.posts').append(new_post);        
        }
        $('.posts').find('.post').first().remove();
        $('.posts').addClass('posts-loaded');
    }});
  });
});

$(window).on('load', function (e){
  if (window.location.hash) {
    $('html, body').animate({
      scrollTop: $(window.location.hash).offset().top - 125
    }, 1000);
  }
});