$( document ).ready(function() {
  $("form#register_form").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this);
    var method = $form.attr("method");
    var url = $form.attr("action");
    var data = $form.serialize();

    $.ajax({
      url: url,
      method: method,
      data: data
    })
    .done(function(response) {
      window.location.href = response.user_link;
    })
    .fail(function(response) {
      var errors = response.responseJSON.errors;
      for (var i in errors) {
        $("ul.error_register").append($("<li />").html(errors[i]));
      }
    });
  });

  $("button#registration_cancel").on("click", function(){
    $("ul.error_register li").remove();
  });

});
