let board = [];
let bot = new Bot();
let moved = false;

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 9; i++) {
    append(board, new TTT);
  }
}

function draw() {
  background(100);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mouseX > i * 50 + 25 && mouseX < i * 50 + 75 && mouseY > j * 50 + 25 && mouseY < j * 50 + 75 && mouseIsPressed && board[3 * j + i].o == undefined && board[3 * i + j].x == undefined) {
        board[3 * i + j].x = true;
        moved = true;
      }

      if (board[3 * i + j].x) {
        textAlign(CENTER);
        text("X", i * 50 + 50, j * 50 + 50);
      }
      if (board[3 * i + j].o) {
        textAlign(CENTER);
        text("O", i * 50 + 50, j * 50 + 50);
      } else {
        textAlign(CENTER);
        text("-", i * 50 + 50, j * 50 + 50);
      }
    }
  }
  if (moved) {
    bot.move(board);
    moved = false;
    console.table(board);
  }
}

function TTT() {
  this.x;
  this.o;
}

function Bot() {
  this.move = function(arr) {
    let done = false;
    while (!done) {
      let rand = floor(random(0, arr.length));
      if (!arr[rand].x && !arr[rand].o) {
        arr[rand].o = true;
        done = true;
      }
    }
  }
}
