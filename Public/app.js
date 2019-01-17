$(document).ready(function() {
  var count = 0;

  $("#scrape").on("click", function(event) {
    event.preventDefault();
    console.log("scrape button clicked");
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function() {
      window.location.href = "/";
    })
  });

  $("#clear").on("click", function(event) {
    event.preventDefault();
    console.log("clear button clicked");
    $.ajax({
      method: "GET",
      url: "/clear"
    }).then(function() {
      window.location.href = "/";
    })
  });

// Whenever someone clicks a p tag
$(document).on("click", ".li-article", function(event) {
  // Empty the notes from the note section
  event.preventDefault();
  console.log("count: "+count);
  count++;
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#currNotes").html("");
      $("#savenote").attr("data-id", data._id);

      // If there's a note in the article
      if (data.note) {
        for(var i=0; i<data.note.length; i++) {
          var li = $("<li>");
          li.append("<p><b>"+data.note[i].title+"</b><i data-id="+data.note[i]._id+" class='ml-1 far fa-trash-alt'></i></p>");
          li.append("<p>"+data.note[i].body+"</p>");
          $("#currNotes").append(li);
        }
      }

      $("#exampleModal").modal();
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("this ID is " + thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      window.location.href = "/";
    });
  });

  $(document).on("click", ".far", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log("this ID is "+thisId)

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "GET",
      url: "/note/" + thisId,
      
    })
      // With that done
      .then(function(data) {
        console.log(data);
        window.location.href = "/";
      });

  });

});
  
  
  