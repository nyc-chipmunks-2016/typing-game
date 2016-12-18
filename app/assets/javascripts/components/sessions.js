$( document ).ready(function() {
  $("form#login_form").on("submit", function() {
    if($("ul.error_login li").size() === 0) {
      $("ul.error_login").append($("<li />").html("The username and password you entered do not match."));
    }
  });

});
