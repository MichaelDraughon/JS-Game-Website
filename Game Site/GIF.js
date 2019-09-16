let arr = [];
let inc = 0;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 25; i++) {
    append(arr, []);
    for (let j = 0; j < 25; j++) {
      append(arr[i], new Node(i * 20 + 10, j * 20 + 10, 15));
    }
  }
}

function draw() {
  background(51);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j].r = map(sin(inc + j / 2 + i / 2), -1, 1, 5, 15);
      colorMode(HSB);
      fill(map(map(sin(inc + j + -i / 2), -1, 1, 5, 15), 5, 15, 0, 255), 255, 255);
      arr[i][j].draw();
      colorMode(RGB);
      inc += 0.0003;
    }
  }
}

function Node(x, y, r) {
  this.r = r;
  this.x = x;
  this.y = y;

  this.draw = function() {
    rectMode(CENTER);
    rect(this.x, this.y, this.r, this.r);
  }
}
