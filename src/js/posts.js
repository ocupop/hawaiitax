(function(){

  $.behaviors('.posts', press);
  function press(container){
    container = $(container);
    var src_url = container.data('src-url');
    $.ajax({
      type: "GET",
      url: src_url,
      success: function(result){
        for(var i=0; i<result.length; i++) {
          var new_post = container.find('.post').first().clone();
          var post_excerpt = result[i].excerpt;
          post_excerpt = $("<div />").html(post_excerpt).text();
          var post_content = result[i].content;
          post_content = $("<div />").html(post_content).text();
          new_post.find('.post-title').text(result[i].title).end()
                  .find('.post-date').text(result[i].date).end()
                  .find('.post-excerpt').append(post_excerpt).end()
                  .find('.post-content').append(post_content).end()
                  .find('.post-pdf').attr('href', result[i].pdf);
                  //.find('.post-link').attr('href', result[i].url);
          container.append(new_post);     
        }
        container.find('.post').first().remove();
        container.addClass('posts-loaded');
    }});
  }
  
})();

$(document).on('ready', function(){
  $('.posts').on('click', '.post-link', function(){
    window.console.log('clicked');
    $('.posts').addClass('single-post-view');
    $(this).closest('div.post').addClass('active');
  });

  $('.posts').on('click', '.close-post', function(){
    $('.posts').removeClass('single-post-view');
    $(this).closest('div.post').removeClass('active');
  });
});