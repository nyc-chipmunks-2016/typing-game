Game.prototype.drawSmoke = function() {
  var game = this,
      parts = [],
      minSpawnTime = 40,
      lastTime = new Date().getTime(),
      maxLifeTime = Math.min(5000, (game.canvas.height/(1.5*60)*1000)),
      emitterX = game.canvas.width / 2,
      emitterY = game.canvas.height - 10,
      smokeImage = new Image();

  function spawn() {
    if (new Date().getTime() > lastTime + minSpawnTime) {
      lastTime = new Date().getTime();
      parts.push(new smoke(emitterX, emitterY));
    }
  }

  function render() {
    var length = parts.length;

    while (length--) {
      if (parts[length].y < 0 || parts[length].lifeTime > maxLifeTime) {
        parts.splice(length, 1);
      } else {
        parts[length].update();

        game.ctx.save();
        var offsetX = -parts[length].size/2,
        offsetY = -parts[length].size/2;

        game.ctx.translate(parts[length].x-offsetX, parts[length].y-offsetY);
        game.ctx.rotate(parts[length].angle / 180 * Math.PI);
        game.ctx.globalAlpha  = parts[length].alpha;
        game.ctx.drawImage(smokeImage, offsetX,offsetY, parts[length].size, parts[length].size);
        game.ctx.restore();
      }
    }
    spawn();
    requestAnimationFrame(render);
  }

  function smoke(x, y, index) {
    this.x = x;
    this.y = y;

    this.size = 1;
    this.startSize = 32;
    this.endSize = 40;

    this.angle = Math.random() * 359;

    this.startLife = new Date().getTime();
    this.lifeTime = 0;

    this.velY = -1 - (Math.random()*0.5);
    this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
  }

  smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.angle += 0.2;

    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * 1);

    this.alpha = 1 - (lifePerc * 0.01);
    this.alpha = Math.max(this.alpha,0);

    this.x += this.velX;
    this.y += this.velY;
  };

  smokeImage.src = "http://somethinghitme.com/projects/particle%20test/images/smoke.png";
  smokeImage.onload = function () {
    render();
  };
};
