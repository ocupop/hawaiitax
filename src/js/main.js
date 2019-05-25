$(document).foundation({
  equalizer: {
    // Specify if Equalizer should make elements equal height once they become stacked.
    equalize_on_stack: false
  }
});

// $(function() {

// });

$(document).ready(function () {
  var params = window.location.search.substring(1);
  if (params.indexOf("thanks") > -1) {
    $("#message").show();
    setTimeout(function () {
      $("#message").fadeOut("slow");
    }, 4000);
  }

  $("#site-search-form").on("click", function () {
    $(this).addClass("active");
    $submit = $(this).find('input[type="submit"]');
  });

  $("#services").on("click", function (event) {
    event.stopPropagation();
    $("#service-choices").toggleClass("active");
  });
  $("#service-choices").on("click", function () {
    event.stopPropagation();
  });
  $("body").on("click", function () {
    $("#service-choices").removeClass("active");
  });

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

$(document).on("click", 'a[href^="#"]', function (event) {
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
$(window).scroll(function () {
  if ($(window).scrollTop() >= 500) {
    $(".client-vault span").removeClass("flashit");
  }
});

// if ($(window).scrollTop() <= 250) {
//   $('#page-header').addClass('top-only');
//  }
//  else {
//   $('#page-header').removeClass('top-only');
//  }

//check for hash on load
$(window).on("load", function (e) {
  if (window.location.hash) {
    $("html, body").animate(
      {
        scrollTop: $(window.location.hash).offset().top - 125
      },
      1000
    );
  }
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
