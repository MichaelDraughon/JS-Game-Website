let bigarr = [];
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  for (let i = 0; i < 100; i++) {
    append(bigarr, []);
    for (let j = 0; j < 80; j++) {
      append(bigarr[i], new Cell(10, i, j));
    }
  }
}

function draw() {
  background(51);
  for (let i = 0; i < bigarr.length; i++) {
    for (let j = 0; j < bigarr[i].length; j++) {
      bigarr[i][j].wave(50, 40);
      bigarr[i][j].show();
    }
  }
}

function Cell(r, i, j) {
  this.r = r;
  this.i = i;
  this.j = j;
  this.show = function() {
    noFill();
    stroke(255);
    rect(this.i * 10 + 5, this.j * 10 + 5, this.r, this.r);
  }
  this.wave = function(i, j) {
    try {
      bigarr[i + 1][j].r = map(sin(x + 0.1), -1, 1, 2, 10);
    } catch (error) {}
    try {
      bigarr[i - 1][j].r = map(sin(x + 0.1), -1, 1, 2, 10);
    } catch (error) {}
    try {
      bigarr[i][j + 1].r = map(sin(x + 0.1), -1, 1, 2, 10);
    } catch (error) {}
    try {
      bigarr[i][j - 1].r = map(sin(x + 0.1), -1, 1, 2, 10);
    } catch (error) {}
    x = x + 0.1;
  }
}
