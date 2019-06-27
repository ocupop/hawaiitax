(function() {
  $.behaviors(".posts", press);
  function press(container) {
    container = $(container);
    var src_url = container.data("src-url");
    $.ajax({
      type: "GET",
      url: src_url,
      success: function(result) {
        for (var i = 0; i < result.length; i++) {
          var new_post = container
            .find(".post")
            .first()
            .clone();
          var featured_image = result[i].featured_image;
          var post_excerpt = result[i].excerpt;
          post_excerpt = $("<div />")
            .html(post_excerpt)
            .text();
          var post_content = result[i].content;
          // post_content = $("<div />").html(post_content).text();
          new_post
            .find(".post-title .post-link")
            .text(result[i].title)
            .attr("href", "#" + result[i].slug)
            .end()
            .find(".post-date")
            .text(result[i].date)
            .end()
            .find(".post-excerpt")
            .append(post_excerpt)
            .end()
            .find(".post-featured-image")
            .each(function() {
              if (featured_image) {
                $(this)
                  .find("img")
                  .attr("src", featured_image);
              } else {
                $(this).remove();
              }
            })
            .end()
            .find(".post-content")
            .append(post_content)
            .end()
            .find(".post-pdf")
            .each(function() {
              if (result[i].pdf) {
                $(this).attr("href", result[i].pdf);
              } else {
                $(this).remove();
              }
            });
          container.append(new_post);
        }
        container
          .find(".post")
          .first()
          .remove();
        container.addClass("posts-loaded");
      }
    });
  }
})();
