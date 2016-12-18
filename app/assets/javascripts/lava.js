$(document).ready(function() {

  var lavaImage = new Image();
  lavaImage.src = '/lava3.png';
  lavaImage.height = 650;
  lavaImage.width = 1000;
  var CanvasXSize = 500,
  CanvasYSize = 600,
  y = -1,
  dy = -1,
  dx = 0.75,
  imgW,
  imgH,
  x = 0,
  clearX,
  clearY,
  ctx;

  lavaImage.onload = function() {
    imgW = lavaImage.width;
    imgH = lavaImage.height;
    if (imgW > CanvasXSize) {
      x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
      clearX = imgW;
    } else { clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
      clearY = imgH;
    } else { clearY = CanvasYSize;
    }
    ctx = document.getElementById('canvasLava').getContext('2d');
    setInterval(lavaVertical, 100);
    draw();
  };

  function draw() {
    ctx.clearRect(0, 0, clearX, clearY);
    if (imgW <= CanvasXSize) {
      if (x > (CanvasXSize)) {
        x = 0;
      }
      if (x > (CanvasXSize - imgW)) {
        ctx.drawImage(lavaImage, x - CanvasXSize + 1, y, imgW, imgH);
      }
    }
    else {
      if (x > (CanvasXSize)) {
         x = CanvasXSize - imgW;
      }
      if (x > (CanvasXSize - imgW)) {
        ctx.drawImage(lavaImage, x - imgW + 1, y, imgW, imgH);
      }
    }
    ctx.drawImage(lavaImage, x, y, imgW, imgH);
    x += dx;
    requestAnimationFrame(draw);
  }

  function lavaVertical() {
    if (-5 <= y && y <= -1) {
      y += dy;
    } else {
      dy = -dy;
      y += dy;
    }
  }

});
