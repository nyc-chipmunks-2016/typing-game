$(document).ready(function() {
  var new_game = new Game();
  new_game.canvas = document.getElementById("myCanvas");
  new_game.ctx = new_game.canvas.getContext("2d");
  new_game.input = document.getElementById("inputText");
  new_game.level = document.getElementById("level");
  var logout = document.getElementById("logout");

  $.when(new_game.getWords()).done(function() {
    new_game.drawStart();
  });

  new_game.input.addEventListener("keyup", function(event) {
    var code = (event.keyCode || event.which);

    if (code === 32) {
      new_game.checkSpelling();
    } else if (code !== 8) {
      new_game.keystrokes += 1;
    }
  });

  if (localStorage.getItem("level")) {
    new_game.level.value = localStorage.getItem("level");
  }

  new_game.level.onchange = function() {
    localStorage.setItem("level", new_game.level.value);
    document.location.reload();
  };

  if (logout) {
    logout.addEventListener("click", function(event) {
      localStorage.clear();
    });
  }
});
