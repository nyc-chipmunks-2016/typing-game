var Game = function() {
  this.lives = 5;
  this.score = 0;
  this.speed = 1;
  this.words = [];
  this.activeWords = [];
  this.correctWords = [];
  this.startTime = 0;
  this.keystrokes = 0;
  this.textVisible = false;
};

Game.prototype.playSplash = function() {
  var audioSplash = document.createElement("audio");
  audioSplash.src = "/splash1.mp3";
  audioSplash.play();
};

Game.prototype.playPlop = function() {
  var audioPlop = document.createElement("audio");
  audioPlop.src = "/plop.mp3";
  audioPlop.play();
};

Game.prototype.playOver = function() {
  var audioOver = document.createElement("audio");
  audioOver.src = "/gameover.mp3";
  audioOver.play();
};

Game.prototype.getWords = function() {
  if (!localStorage.level) {
    localStorage.level = 1;
  }
  console.log(localStorage.level);
  return $.ajax({
    url: "/game-words",
    method: "get",
    data: {level: localStorage.level}
  }).done(function(response) {
    this.words = response;
  }.bind(this));
};

Game.prototype.drawStart = function() {
  this.ctx.beginPath();
  this.ctx.rect(175, 275, 150, 60);
  this.ctx.strokeStyle = "#0095DD";
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.font = "30px Arial";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("START", 200, 315);

  this.startGame();
};

Game.prototype.startGame = function() {
  this.canvas.addEventListener('click', function(event) {
    var x = event.pageX - this.canvas.offsetLeft;
    var y = event.pageY - this.canvas.offsetTop;

    if (y > 275 && y < 335 && x > 175 && x < 325) {
      this.input.focus();
      this.addWord();
      this.startTime = new Date().getTime();
      setInterval(this.addWord.bind(this), 1000);
      this.drawGame();
    }
  }.bind(this));
};

Game.prototype.drawGame = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.drawLives();
  this.drawScore();

  if (this.lives === 0) {
    this.drawGameOver();
    this.drawRestart();
  } else if (this.activeWords.length === 0 && this.words.length === 0) {
    this.drawWin();
    this.drawContinue();
    this.drawRestart();
  } else {
    this.drawWord();
    this.collisionTest();

    for (var i in this.activeWords) this.activeWords[i].y += this.speed;

    requestAnimationFrame(this.drawGame.bind(this));
  }
};

Game.prototype.collisionTest = function() {
  for (var i in this.activeWords) {
    if (this.activeWords[i].y > this.canvas.height - 110) {
      this.playSplash();
      this.activeWords.splice(i, 1);
      this.lives -= 1;
    }
  }
};

Game.prototype.checkSpelling = function() {
  var inputValue = $("#inputText").val();
  for (var i in this.activeWords) {
    if (this.activeWords[i].text === inputValue.trim()) {
      this.playPlop();
      this.score += this.activeWords[i].points;
      var correctWord = this.activeWords.splice(i, 1)[0];
      this.correctWords.push(correctWord);
      return $("#inputText").val("");
    }
  }
};

Game.prototype.addWord = function() {
  if (this.words.length > 0) {
    var word = this.words.shift();
    this.activeWords.push(word);
  }
};

Game.prototype.drawLives = function() {
  this.ctx.font = "20px Arial";
  this.ctx.fillStyle = "black";
  this.ctx.fillText("LIVES: " + this.lives, 400, 570);
};

Game.prototype.drawScore = function() {
  this.ctx.font = "20px Arial";
  this.ctx.fillStyle = "black";
  this.ctx.fillText("SCORE: " + this.score, 20, 570);
};

Game.prototype.drawWord = function() {
  this.ctx.font = "20px Arial";
  this.ctx.fillStyle = "#0095DD";
  var words = this.activeWords;
  for (var i in words) {
    this.ctx.fillText(words[i].text, words[i].x, words[i].y);
  }
};

Game.prototype.drawWin = function() {
  this.ctx.font = "30px Arial";
  this.ctx.fillStyle = "#0095DD";
  this.activeWords = [];
  this.ctx.fillText("LEVEL COMPLETE", 120, 200);
  this.saveGame();
};

Game.prototype.drawGameOver = function() {
  var that = this;
  this.ctx.fillStyle = "#0095DD";
  this.activeWords = [];
  this.interval = setInterval(function() { that.doBlink(); }, 800);
  
  // Need to pick a better gameover sound
  // this.playOver();
  this.saveGame();
};

Game.prototype.doBlink = function() {
  if(this.textVisible) {
    this.ctx.clearRect(0,0, 500, 300);
    this.textVisible = false;
  }
  else {
    this.ctx.font = "30px 'Press Start 2P'";
    this.ctx.fillText("GAME OVER", 115, 299);
    this.textVisible = true;
  }
};

Game.prototype.drawRestart = function() {
  this.ctx.beginPath();
  this.ctx.rect(200, 325, 100, 40);
  this.ctx.strokeStyle = "#0095DD";
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.font = "16px Arial";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("RESTART", 214, 350);

  this.canvas.addEventListener('click', function(event) {
    var x = event.pageX - this.canvas.offsetLeft;
    var y = event.pageY - this.canvas.offsetTop;

    if (y > 325 && y < 365 && x > 200 && x < 300) {
      // create new game instead of reloading everything
      document.location.reload();
    }
  }.bind(this));
};

Game.prototype.drawContinue = function() {
  this.ctx.beginPath();
  this.ctx.rect(200, 250, 100, 40);
  this.ctx.strokeStyle = "#0095DD";
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.font = "16px Arial";
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillText("CONTINUE", 208, 275);

  this.nextLevel();
};

Game.prototype.nextLevel = function() {
  this.canvas.addEventListener('click', function(event) {
    var x = event.pageX - this.canvas.offsetLeft;
    var y = event.pageY - this.canvas.offsetTop;
    if (y > 250 && y < 290 && x > 200 && x < 300) {
      if (parseInt(localStorage.level) < 6) {
        localStorage.setItem("level", parseInt(localStorage.level) + 1);
      }
      document.location.reload();
    }
  }.bind(this));
};

Game.prototype.saveGame = function() {
  var endTime = new Date().getTime();
  var totalTime = (endTime - this.startTime) / 60000;
  var totalLetters = this.correctWords.reduce(function(total, word) {
    return total + word.text.length;
  }, 0);
  var normalizeWords = totalLetters / 5;
  var wpm = normalizeWords / totalTime;
  var accuracy = (totalLetters / this.keystrokes) * 100;
  var score = this.score;
  var level = localStorage.level;

  if (wpm > 0) {
    $.ajax({
      url: "/games",
      method: "post",
      data: {game: {score: score, wpm: wpm, accuracy: accuracy, time: totalTime, level: level}}
    });
  }
};
