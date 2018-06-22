// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  //#submitBtn #eatItBtn
  $("#submitBtn").mouseover(function(){
    $(this).addClass("animated infinite rubberBand");
  }).mouseout(function(){
    $(this).removeClass("animated infinite rubberBand");
  });

  $("#eatItBtn").mouseover(function(){
    $(this).addClass("animated infinite jello");
  }).mouseout(function(){
    $(this).removeClass("animated infinite jello");
  });

  $(".change-Dev").on("click", function(event) {
    var id = $(this).data("id");
    var newDev = $(this).data("newdev");

    var newDevState = {
      devoured: newDev
    };

    // Send the PUT request.
    $.ajax("/api/pizzas/" + id, {
      type: "PUT",
      data: newDevState
    }).then(
      function() {
        console.log("changed dev to", newDev);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newPizza = {
      pizza_name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/pizzas", {
      type: "POST",
      data: newPizza
    }).then(
      function() {
        console.log("created new pizza");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
