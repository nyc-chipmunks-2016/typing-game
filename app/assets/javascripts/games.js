// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var score = 0;
  var dy = 2;
  var words = [];
  var active_words = [];
  var lives = 5;

  function getWords() {
    return $.ajax({
      url: "/game-words",
      method: "get"
    }).done(function(response) {
      for (var i in response) {
        words.push(response[i])
      }
    });
  }

  function collisionTest() {
    for (var i in active_words) {
      if (active_words[i].y > canvas.height - 10) {
        active_words.splice(i, 1)
        lives -= 1;
      }
    }
  }

  function addWord() {
    if (words.length > 0) {
      var word = words.shift()
      active_words.push(word);
    }
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, 5, 595);
  }

  function drawWord() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    for (var i in active_words) {
      ctx.fillText(active_words[i].text, active_words[i].x, active_words[i].y);
    }
  }

  function drawGameOver() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#0095DD";
    active_words = [];
    ctx.fillText("GAME OVER", 150, 300);
  }

  function drawRestart() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Restart?", 215, 325);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLives();
    if (lives === 0) {
      console.log("over");
      drawGameOver();
      drawRestart();
    }
    else {
      drawWord();
      for (var i in active_words) {
        active_words[i].y += dy;
      }
      collisionTest();
      requestAnimationFrame(draw);
    }
  }

  $.when(getWords()).done(function() {
    setInterval(addWord, 500);
    draw();
  });
})
