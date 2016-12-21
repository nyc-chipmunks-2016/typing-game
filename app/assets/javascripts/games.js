$(document).ready(function() {
  var logout = document.getElementById("logout"),
      level = document.getElementById("level"),
      category = document.getElementById("category"),
      new_game = new Game();
  new_game.canvas = document.getElementById("myCanvas");
  new_game.ctx = new_game.canvas.getContext("2d");
  new_game.input = document.getElementById("inputText");

  $.when(new_game.getWords()).done(function() {
    new_game.drawStart();
  });

  new_game.input.addEventListener("keyup", function(event) {
    var code = (event.keyCode || event.which);

    if (code != 8 && code != 13 && code != 32) {
      new_game.keystrokes += 1;
    } else if (code === 13) {
      $("#inputText").val("");
    }
    new_game.checkSpelling();
  });

  if (localStorage.getItem("level")) {
    level.value = localStorage.getItem("level");
  }

  level.onchange = function() {
    localStorage.setItem("level", level.value);
    document.location.reload();
  };

  if (localStorage.getItem("category")) {
    category.value = localStorage.getItem("category");
  }

  category.onchange = function() {
    localStorage.setItem("category", category.value);
    document.location.reload();
  };

  if (logout) {
    logout.addEventListener("click", function(event) {
      localStorage.clear();
    });
  }
});
