// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var score = 0;
  var dy = 3;
  var words = [];
  var activeWords = [];
  var lives = 5;
  var formValue = $("#inputText").attr("value")

  function getWords() {
    return $.ajax({
      url: "/game-words",
      method: "get"
    }).done(function(response) {
      words = response;
    });
  }

  function collisionTest() {
    for (var i in activeWords) {
      if (activeWords[i].y > canvas.height - 20) {
        activeWords.splice(i, 1)
        lives -= 1;
      }
    }
  }

  function addWord() {
    if (words.length > 0) {
      var word = words.shift()
      activeWords.push(word);
    }
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, 5, 595);
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 350, 595);
  }

  function drawLava() {
    ctx.beginPath();
    ctx.rect(0, canvas.height - 20, canvas.width, canvas.height);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }

  function drawWord() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    for (var i in activeWords) {
      ctx.fillText(activeWords[i].text, activeWords[i].x, activeWords[i].y);
    }
  }

  function drawGameOver() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#0095DD";
    activeWords = [];
    ctx.fillText("GAME OVER", 160, 300);
  }

  function drawRestartBox() {
    ctx.beginPath();
    ctx.rect(200, 325, 100, 40);
    ctx.strokeStyle = "#0095DD";
    ctx.stroke();
    ctx.closePath();
  }

  function drawRestart() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Restart?", 220, 350);
  }

  function restart() {
    canvas.addEventListener('click', function(event) {
      var x = event.pageX - canvas.offsetLeft;
      var y = event.pageY - canvas.offsetTop;
      if (y > 325 && y < 365 && x > 200 && x < 300) {
        document.location.reload();
      }
    });
  }

  function checkSpelling() {
    formValue = $("#inputText").val()
    for (var i in activeWords) {
      if (activeWords[i].text === formValue) {
        score += activeWords[i].points;
        activeWords.splice(i, 1);
        $("#inputText").val("")
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLava();
    drawLives();
    drawScore();
    if (lives === 0) {
      drawGameOver();
      drawRestartBox();
      drawRestart();
      restart();
    }
    else {
      checkSpelling();
      drawWord();
      for (var i in activeWords) {
        activeWords[i].y += dy;
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
