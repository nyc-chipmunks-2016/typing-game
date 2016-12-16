// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// Prevent closing the sign in form on click
$("#dropdown-login").click(function(e) {
   e.stopPropagation();
});
