
jQuery(function() {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  window.idx = lunr(function () {
    this.field('name', { boost: 10 });
    this.field('title');
    this.field('url');
    this.field('bio');
  });

  // Download the data from the JSON file we generated
  window.data = $.getJSON("/data/search.json");

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  // Event when the form is submitted
  $("#site-search-form").submit(function(){
      window.console.log('submitted');
      event.preventDefault();
      var query = $("#search_box").val(); // Get the value for the text field
      window.console.log(query);
      var results = window.idx.search(query); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          var appendString = '<li>';
              appendString += '<h2><a href="' + item.url + '">'+ item.name +'</a></h2>';
              appendString += '<p><em>'+ item.title +'</em></p>';
              appendString += '<p>'+ item.bio +'</p>';
              appendString += '</li><hr>';

          // Add it to the results
          $search_results.append(appendString);
          $("html, body").animate({ scrollTop: 0 }, "slow");
          $("#site-search-results").fadeIn();
        });
      } else {
        $search_results.html('<li>No results found</li>');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $("#site-search-results").fadeIn();
      }
    });
  }
});

$(document).ready(function(){
  $('#close-search').on('click', function(){
    $('#site-search-results').fadeOut();
  });
})

