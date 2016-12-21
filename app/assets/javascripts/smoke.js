$(document).ready(function() {
  var activeSmoke = false;

  var canvasSmoke = document.getElementById("canvasSmoke"),
      ctxSmoke = canvasSmoke.getContext("2d");

  var drawSmoke = function() {
    // var game = this,
        var parts = [],
        minSpawnTime = 500,
        lastTime = new Date().getTime(),
        maxLifeTime = Math.min(5000, (canvasSmoke.height/(1.5*60)*1000)),
        emitterX = canvasSmoke.width / 2,
        emitterY = canvasSmoke.height - 10,
        smokeImage = new Image();

    function spawn() {
      if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new smoke(emitterX, emitterY));
      }
    }

    function render() {
      var length = parts.length;
      ctxSmoke.clearRect(0,0, canvasSmoke.width, canvasSmoke.height);
      while (length--) {
        if (parts[length].y < 0 || parts[length].lifeTime > maxLifeTime) {
          parts.splice(length, 1);
        } else {
          parts[length].update();

          ctxSmoke.save();
          var offsetX = -parts[length].size/2,
          offsetY = -parts[length].size/7;

          ctxSmoke.translate(parts[length].x-offsetX, parts[length].y-offsetY);
          ctxSmoke.rotate(parts[length].angle / 180 * Math.PI);
          ctxSmoke.globalAlpha  = parts[length].alpha;
          ctxSmoke.drawImage(smokeImage, offsetX,offsetY, parts[length].size, parts[length].size);
          ctxSmoke.restore();
        }
      }
      spawn();
      requestAnimationFrame(render);
    }

    function smoke(x, y, index) {
      this.x = x;
      this.y = y;

      this.size = 1;
      this.startSize = 1;
      this.endSize = 10;

      this.angle = 120;

      this.startLife = new Date().getTime();
      this.lifeTime = 0;

      this.velY = -1 - (Math.random()*0.5);
      this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
    }

    smoke.prototype.update = function () {
      this.lifeTime = new Date().getTime() - this.startLife;
      this.angle += 0.2;

      var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

      this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * 0.75);

      this.alpha = 1 - (lifePerc * 0.02);
      this.alpha = Math.max(this.alpha,0);

      this.x += this.velX;
      this.y += this.velY;
    };

    smokeImage.src = "http://i.imgur.com/wJxI64w.png";
    // smokeImage.onload = setInterval( function () {
    //   render();}, 1000);
    smokeImage.onload = function() {
      render();
    };
  };
  // var activateSmoke = function() {
  //   if (activeSmoke === false) {
  //     drawSmoke();
  //     activeSmoke = true;
  //     console.log("Turn on");
  //   }
  //   else {
  //     activeSmoke = false;
  //     console.log("Turn off");
  //   }
  // };
  drawSmoke();
  // setInterval(activateSmoke(), 10000);
});
