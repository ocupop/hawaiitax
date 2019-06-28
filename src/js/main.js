$(document).ready(function() {
  var params = window.location.search.substring(1);
  if (params.indexOf("thanks") > -1) {
    $("#message").show();
    setTimeout(function() {
      $("#message").fadeOut("slow");
    }, 4000);
  }

  $("#site-search-form").on("click", function() {
    $(this).addClass("active");
    $submit = $(this).find('input[type="submit"]');
  });

  $("#services").on("click", function(event) {
    event.stopPropagation();
    $("#service-choices").toggleClass("active");
  });

  $("#service-choices").on("click", function() {
    event.stopPropagation();
  });

  $("body").on("click", function() {
    $("#service-choices").removeClass("active");
  });

  $(".megamenu-toggle").on("click", function() {
    console.log("remove hover");
    $(this).removeClass("megamenu-hover");
  });

  function postClick() {
    if ($(".posts").length) {
      $(".posts").on("click", ".post-link", function() {
        $(".posts").addClass("single-post-view");
        $(".post.active").removeClass("active");

        $(this)
          .closest("div.post")
          .addClass("active");
        window.scrollTo(0, 0);
      });

      $(".posts").on("click", ".close-post", function() {
        $(".posts").removeClass("single-post-view");
        $(this)
          .closest("div.post")
          .removeClass("active");
      });
    }
  }
  postClick();

  function loadPosts() {
    var post_container = $(".posts");
    var src_url = post_container.data("src-url");
    $.ajax({
      type: "GET",
      url: src_url,
      success: function(result) {
        for (var i = 0; i < result.length; i++) {
          var new_post = post_container
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
          post_container.append(new_post);
        }
        post_container
          .find(".post")
          .first()
          .remove();
        post_container.addClass("posts-loaded");
      }
    });
  }

  loadPosts();

  // $('a[href*="#"]:not([href="#"])').click(function() {
  //   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  //     var target = $(this.hash);
  //     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  //     window.console.log(target);
  //     if (target.length) {
  //       $('html, body').animate({
  //         scrollTop: target.offset().top - 125
  //       }, 1000);
  //       return false;
  //     }
  //   }
  // });
});

$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top - 130
    },
    500
  );
});

// $(document).mouseup(function (e)
// {
//   var container = $("fieldset.services.active");
//   if (!container.is(e.target)) // if the target of the click isn't the container...
//     //&& container.has(e.target).length === 0) // ... nor a descendant of the container
//   {
//     container.removeClass('active');
//   }
// });

//on user scroll, hide client vault notification
$(window).scroll(function() {
  if ($(window).scrollTop() >= 500) {
    $(".client-vault span").removeClass("flashit");
  }
});

//check for hash on load
$(window).on("load", function(e) {
  if (window.location.hash) {
    $("html, body").animate(
      {
        scrollTop: $(window.location.hash).offset().top - 125
      },
      1000
    );
  }
});

$(window).on("hashchange", function() {
  window.location.reload(true);
});

// $("#testimonials > div:gt(0)").hide();
// setInterval(function() {
//   $('#testimonials > div:first')
//     .fadeOut(1000)
//     .next()
//     .fadeIn(1000)
//     .end()
//     .appendTo('#testimonials');
// },  3000);
