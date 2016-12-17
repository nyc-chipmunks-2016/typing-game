// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var score = 0;
  var speed = 1;
  var words = [];
  var activeWords = [];
  var correctWords = [];
  var lives = 5;
  var input = document.getElementById("inputText");
  var inputValue = $("#inputText").attr("value");
  var startTime = 0;
  var endTime = 0;
  var keystrokes = 0;
  var wpm = 0;
  var accuracy = 0;

  input.addEventListener("keyup", function(event) {
    var code = (event.keyCode || event.which);
    if (code != 8 && code != 32) {
      keystrokes += 1;
    }
  });

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
        activeWords.splice(i, 1);
        lives -= 1;
      }
    }
  }

  function addWord() {
    if (words.length > 0) {
      var word = words.shift();
      activeWords.push(word);
    }
  }

  function drawStartButton() {
    ctx.beginPath();
    ctx.rect(175, 275, 150, 60);
    ctx.strokeStyle = "#0095DD";
    ctx.stroke();
    ctx.closePath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("START", 200, 315);
  }

  function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, 430, 597);
  }

  function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 3, 597);
  }

  function drawLava() {
    ctx.beginPath();
    ctx.rect(0, canvas.height - 20, canvas.width, canvas.height);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }

  function drawWord() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    for (var i in activeWords) {
      ctx.fillText(activeWords[i].text, activeWords[i].x, activeWords[i].y);
    }
  }

  function drawWin() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#0095DD";
    activeWords = [];
    ctx.fillText("LEVEL COMPLETE", 120, 200);
  }

  function drawGameOver() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#0095DD";
    activeWords = [];
    ctx.fillText("GAME OVER", 160, 300);
  }

  function drawRestart() {
    ctx.beginPath();
    ctx.rect(200, 325, 100, 40);
    ctx.strokeStyle = "#0095DD";
    ctx.stroke();
    ctx.closePath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Restart?", 220, 350);
  }

  function drawNextLevel() {
    ctx.beginPath();
    ctx.rect(200, 250, 100, 40);
    ctx.strokeStyle = "#0095DD";
    ctx.stroke();
    ctx.closePath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Next Level", 213, 275);
  }

  function nextLevel() {
    canvas.addEventListener('click', function(event) {
      var x = event.pageX - canvas.offsetLeft;
      var y = event.pageY - canvas.offsetTop;
      if (y > 250 && y < 290 && x > 200 && x < 300) {
        // Will later add logic to move to next level
        document.location.reload();
      }
    });
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

  function gameTime() {
    endTime = new Date().getTime();
    return (endTime - startTime)/60000;
  }

  function totalLetters() {
    var totalLength = 0;
    for (var i in correctWords) {
      totalLength += correctWords[i].text.length;
    }
    return totalLength;
  }

  function normalizeWords() {
    return totalLetters() / 5;
  }

  function checkSpelling() {
    inputValue = $("#inputText").val();
    for (var i in activeWords) {
      if (activeWords[i].text === inputValue.trim()) {
        score += activeWords[i].points;
        correctWord = activeWords.splice(i, 1);
        correctWords.push(correctWord[0]);
        $("#inputText").val("");
      }
    }
  }

  function start() {
    canvas.addEventListener('click', function(event) {
      var x = event.pageX - canvas.offsetLeft;
      var y = event.pageY - canvas.offsetTop;
      if (y > 275 && y < 335 && x > 175 && x < 325) {
        input.focus();
        addWord();
        startTime = new Date().getTime();
        setInterval(addWord, 1000);
        drawGame();
      }
    });
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLava();
    drawLives();
    drawScore();
    if (lives === 0) {
      wpm = normalizeWords() / gameTime();
      accuracy = totalLetters() / keystrokes * 100;
      drawGameOver();
      drawRestart();
      restart();
    } else if (activeWords.length === 0 && words.length === 0) {
      wpm = normalizeWords() / gameTime();
      accuracy = totalLetters() / keystrokes * 100;
      drawWin();
      drawNextLevel();
      drawRestart();
      nextLevel();
      restart();
    }
    else {
      checkSpelling();
      drawWord();
      for (var i in activeWords) {
        activeWords[i].y += speed;
      }
      collisionTest();
      requestAnimationFrame(drawGame);
    }
  }

  $.when(getWords()).done(function() {
    drawStartButton();
    start();
  });
});
