$(document).ready(function() {
  var logout = document.getElementById("logout");
  var level = document.getElementById("level");
  var new_game = new Game();
  new_game.canvas = document.getElementById("myCanvas");
  new_game.ctx = new_game.canvas.getContext("2d");
  new_game.input = document.getElementById("inputText");


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

  var score = 0;
  var speed = 1;
  var words = [];
  var activeWords = [];
  var correctWords = [];
  var lives = 5;
  var startTime = 0;
  var endTime = 0;
  var totalTime = 0;
  var keystrokes = 0;
  var wpm = 0;
  var accuracy = 0;
  var audioSplash = document.createElement("audio");
  var audioPlop = document.createElement("audio");
  var audioOver = document.createElement("audio");
  audioSplash.src = "/splash1.mp3";
  audioPlop.src = "/plop.mp3";
  audioOver.src = "/gameover.mp3";


  if (localStorage.getItem("level")) {
    level.value = localStorage.getItem("level");
  }

  level.onchange = function() {
    localStorage.setItem("level", level.value);
    document.location.reload();
  };

  if (logout) {
    logout.addEventListener("click", function(event) {
      localStorage.clear();
    });
  }


  function getWords() {
    return $.ajax({
      url: "/game-words",
      method: "get",
      data: {level: level.value}
    }).done(function(response) {
      words = response;
    });
  }

  function saveGame() {
    totalTime = gameTime();
    wpm = normalizeWords() / totalTime;
    accuracy = (totalLetters() / keystrokes) * 100;
    if (accuracy > 100) {
      accuracy = 100;
    }
    if (wpm > 0) {
      $.ajax({
        url: "/games",
        method: "post",
        data: {score: score, wpm: wpm, accuracy: accuracy, time: totalTime, level: level.value}
      });
    }
  }

  function collisionTest() {
    for (var i in activeWords) {
      if (activeWords[i].y > canvas.height - 110) {
        activeWords.splice(i, 1);
        lives -= 1;
        audioSplash.play();
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
    ctx.fillStyle = "black";
    ctx.fillText("Lives: " + lives, 415, 570);
  }

  function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 20, 570);
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
    audioOver.play();
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
        if (parseInt(level.value) < 6) {
          localStorage.setItem("level", parseInt(level.value) + 1);
        }
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
    return correctWords.reduce(function(total, word) {
      return total + word.text.length;
    }, 0);
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
        audioPlop.play();
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
    drawLives();
    drawScore();
    if (lives === 0) {
      saveGame();
      drawGameOver();
      drawRestart();
      restart();
    } else if (activeWords.length === 0 && words.length === 0) {
      saveGame();
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
