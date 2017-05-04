---
#adding front matter to be able to access press_url
---

jQuery(function() {
  // Initialize an empty data object to use for searching
  window.data = {};
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.

  window.idx = lunr(function () {
    this.field('name', { boost: 10 });
    this.field('title'), { boost: 10 };
    //this.field('url');
    //this.field('bio');
  });

  // Download the data from the JSON file we generated
  window.data.local = $.getJSON("/data/search.json");
  window.data.posts = $.getJSON("{{ site.press_url }}/posts.json");

  // Wait for the data to load and add it to lunr
  window.data.local.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  // Wait for the post data to load and add it to lunr
  window.data.posts.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  // Event when the form is submitted
  $("#site-search-form").submit(function(){
      event.preventDefault();
      var query = $("#search_box").val(); // Get the value for the text field
      var results = window.idx.search(query); // Get lunr to perform a search
      $('.num_results').html('A search for <strong>'+ query +'</strong> returned ' + results.length + ' results');
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#search-results-local, #search-results-posts").empty();
    // Are there any results?
    if (results.length) {
      // Iterate over the results
      window.data.local.then(function(loaded_data) {
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          if(item){
            // Build a snippet of HTML for this result
            var appendString = '<li>';
                appendString += '<h2><a href="' + item.url + '">'+ item.name +'</a></h2>';
                appendString += '<p><em>'+ item.title +'</em></p>';
                appendString += '<p>'+ item.content.substring(0,100) +'...</p>';
                appendString += '</li><hr>';

            // Add it to the results
            $("#search-results-local").append(appendString);
          }
        });
      });

      window.data.posts.then(function(loaded_data) {
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          if(item){
            var date = new Date(item.date);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();

            // Build a snippet of HTML for this result
            var appendString = '<li>';
                appendString += '<h3><a href="{{ site.press_url }}' + item.url + '">'+ item.title +'</a></h3>';
                appendString += '<p><em>'+ month + "/" + day + "/" + year + '</em></p>';
                appendString += '<p>'+item.content.replace(/<\/?[^>]+(>|$)/g, "").substring(0,100) +'...</p>';
                appendString += '</li><hr>';

            // Add it to the results
            $("#search-results-posts").append(appendString);
          }
        });
      });

    } else {
      $("#search-results-posts").html('<li>No results found</li>');
    }

    $('body').addClass('search_results');
    $("#site-search-results").fadeIn();
  }

});



$(document).ready(function(){
  $('#close-search').on('click', function(){
    $('#site-search-results').fadeOut();
    $('body').removeClass('search_results');
  });
});
