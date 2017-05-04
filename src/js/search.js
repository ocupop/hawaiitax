---
#adding front matter to be able to access press_url
---

jQuery(function() {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  window.idx = lunr(function () {
    this.field('name', { boost: 10 });
    this.field('title');
    //this.field('url');
    //this.field('bio');
  });

  // Download the data from the JSON file we generated
  // window.data = function(){
  //   var data = 
  // }
  window.data = {};

  window.data.local = $.getJSON("/data/search.json");
  window.data.posts = $.getJSON("{{ site.press_url }}/posts.json");

  // Wait for the data to load and add it to lunr
  window.data.local.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      //window.console.log('value:', value);
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  //Wait for the post data to load and add it to lunr
  window.data.posts.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      //window.console.log('post value:', value);
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
      //display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    window.console.log(results);
    // Wait for data to load
    // window.data.local.then(function(loaded_data) {

    //   // Are there any results?
    //   if (results.length) {
    //     window.console.log('local results', results);
    //     $("#search-results-local").empty(); // Clear any old results

    //     // Iterate over the results
    //     // results.forEach(function(result) {
    //     //   var item = loaded_data[result.ref];

    //     //   if(item){
    //     //     // Build a snippet of HTML for this result
    //     //     var appendString = '<li>';
    //     //         appendString += '<h2><a href="' + item.url + '">'+ item.name +'</a></h2>';
    //     //         appendString += '<p><em>'+ item.title +'</em></p>';
    //     //         appendString += '<p>'+ item.content +'</p>';
    //     //         appendString += '</li><hr>';

    //     //     // Add it to the results
    //     //     $("#search-results-local").append(appendString);
    //     //   }
    //     // });
    //   } else {
    //     $("#search-results-local").html('<li>No results found</li>');
    //   }
    // });

    // window.data.posts.then(function(loaded_data) {

    //   // Are there any results?
    //   if (results.length) {
    //     window.console.log('post results', results)
    //     $("#search-results-posts").empty(); // Clear any old results

    //     // Iterate over the results
    //     // results.forEach(function(result) {
    //     //   var item = loaded_data[result.ref];
    //     //   window.console.log(loaded_data[result.ref]);

    //     //   if(item){
    //     //     // Build a snippet of HTML for this result


    //     //     var appendString = '<li>';
    //     //         appendString += '<h2><a href="{{ site.press_url }}' + item.url + '">'+ item.title +'</a></h2>';
    //     //         appendString += '<p><em>'+ item.date + '</em></p>';
    //     //         appendString += '</li><hr>';

    //     //     // Add it to the results
    //     //     $("#search-results-posts").append(appendString);
    //     //   }
    //     // });
    //   } else {
    //     $("#search-results-posts").html('<li>No results found</li>');
    //   }
    // });

    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#site-search-results").fadeIn();
  }
});



$(document).ready(function(){
  $('#close-search').on('click', function(){
    $('#site-search-results').fadeOut();
  });
})

