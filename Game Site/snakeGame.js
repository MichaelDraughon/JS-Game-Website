var snakeX = 200;
var snakeY = 200;
var snakeLength = 1;
var snakeSize = 20;

var Xlog = [];
var Ylog = [];

var turnCode = -1;

var isDead = false;

var randomX;
var randomY;

var gotApple = false;

var bufferTime = 25;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  background(51);
  frameRate(30);
  genApple();
}

function draw() {
  if (frameCount % 6 == 0) {
    background(51);
    stroke(0);
    strokeWeight(6);
    line(0, 3, width, 3);
    line(width, 3, width, height);
    line(0, height, width, height);
    line(0, 3, 0, height);
    strokeWeight(1);
    textSize(15);
    stroke(255);
    fill(255);
    text("Length: " + snakeLength, 10, 20)
    if (!isDead) {
      snakeLog(snakeX, snakeY);
      showApple();
      show();
      moveSnake();
      turnSnake();
      isOutOFBounds();
      if (snakeX == randomX * 20 && snakeY == randomY * 20) {
        gotApple = true;
      }
      if (gotApple) {
        genApple();
        snakeLength++;
        gotApple = false;
      }
    }

    if (isDead) {
      stroke(0);
      fill(0);
      rect(200, 200, (width / 2) - 100, (height / 2) - 100);
      stroke(255);
      fill(255);
      textSize(28);
      text("You Died, Your Length Was " + snakeLength, 300, 375);
      bufferTime--;
      text("Restart in " + (int(bufferTime / 5) + 1), 300, 425);
      if (bufferTime <= 0) {
        reset();
      }
    }
  } else {
    moveSnake();
  }
}

function reset() {
  snakeX = 200;
  snakeY = 200;
  snakeLength = 1;
  snakeSize = 20;
  turnCode = -1;
  isDead = false;
  gotApple = false;
  bufferTime = 25;
  Xlog = [];
  Ylog = [];
}

function genApple() {
  randomX = random(0, width / 20);
  randomY = random(0, height / 20);
  randomX = int(randomX);
  randomY = int(randomY);
  stroke(255, 0, 0);
  fill(255, 0, 0);
  rect(randomX * 20, randomY * 20, snakeSize, snakeSize);
}

function showApple() {
  stroke(255, 0, 0);
  fill(255, 0, 0);
  rect(randomX * 20, randomY * 20, snakeSize, snakeSize);
}

function isOutOFBounds() {
  if (snakeX > width) {
    snakeX = width;
    isDead = true;
  } else if (snakeX < 0) {
    snakeX = 0;
    isDead = true;
  } else if (snakeY > height) {
    snakeY = height;
    isDead = true;
  } else if (snakeY < 0) {
    snakeY = 0;
    isDead = true;
  }
}

function turnSnake() {
  if (turnCode == 0) {
    snakeY -= snakeSize;
  } else if (turnCode == 1) {
    snakeY += snakeSize;
  } else if (turnCode == 2) {
    snakeX -= snakeSize;
  } else if (turnCode == 3) {
    snakeX += snakeSize;
  }
}

function moveSnake() {
  if (keyIsDown(87)) {
    turnCode = 0;
  } else if (keyIsDown(83)) {
    turnCode = 1;
  } else if (keyIsDown(65)) {
    turnCode = 2;
  } else if (keyIsDown(68)) {
    turnCode = 3
  }
}


function show() {
  stroke(0);
  fill(255);
  for (var i = 0; i < snakeLength; i++) {
    rect(Xlog[i], Ylog[i], snakeSize, snakeSize);
  }
}

function snakeLog(x, y) {
  append(Xlog, x);
  append(Ylog, y);
  if (Xlog.length > snakeLength) {
    for (var i = 0; i < Xlog.length; i++) {
      if (i == Xlog.length - 1) {
        Xlog.pop();
        Ylog.pop();
      } else {
        Xlog[i] = Xlog[i + 1];
        Ylog[i] = Ylog[i + 1];
      }
    }
  }
}
