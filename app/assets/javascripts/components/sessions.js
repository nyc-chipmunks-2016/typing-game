$( document ).ready(function() {
  $("form#login_form").on("submit", function(event) {
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
    .fail(function() {
      if($("ul.error_login li").size() === 0) {
        $("ul.error_login").append($("<li />").html("The username and password you entered do not match."));
      }
    });

    // var request = new XMLHttpRequest();


  });

  $("button#login_cancel").on("click", function(){
    $("ul.error_login li").remove();
  });

});
