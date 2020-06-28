// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-action").on("click", function(event) {
    var id = $(this).data("id");
    var newAction = $(this).data("newaction");

    var newActionState = {
      action: newAction
    };

    // Send the PUT request.
    $.ajax("/api/order/" + id, {
      type: "PUT",
      data: newActionState
    }).then(
      function() {
        console.log("changed order to", newAction);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
      // action: $("[name=name]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/order", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new order");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/order/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted order", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
