let carr = [];
let tf;
let mouseLog = [];

let mineWidth = 20;
let mineHeight = 20;

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < mineWidth; i++) {
    let tempArr = [];
    for (let j = 0; j < mineHeight; j++) {
      let rando = random(0, 1);
      if (rando > 0.95) {
        tf = true;
      } else {
        tf = false;
      }
      let cell = new Cell(i, j, 30, tf);
      append(tempArr, cell);
    }
    append(carr, tempArr);
  }

  check();

}

function draw() {
  background(51);
  mouseTrack();
  isClicked();
  for (let i = 0; i < mineWidth; i++) {
    for (let j = 0; j < mineHeight; j++) {
      carr[i][j].draw();
    }
  }
}

function isClicked() {
  if (mouseLog[0] == false && mouseLog[0] != mouseLog[1]) {
    let i = floor(mouseX / 30);
    let j = floor(mouseY / 30);
    if (mouseX > mineWidth * 30 || mouseY > mineHeight * 30) {
      i = mineWidth - 1;
      j = mineHeight - 1;
    }
    if (mouseButton == LEFT) {
      carr[i][j].s = true;
      if (carr[i][j].count == 0) {
        cascade(i, j);
      }
      if (carr[i][j].b == true) {
        flash();
        reset();
      }
    }
  }
  if (mouseButton == RIGHT) {
    carr[floor(mouseX / 30)][floor(mouseY / 30)].f = true;
  }
}

function mouseTrack() {
  if (mouseIsPressed) {
    append(mouseLog, true);
  } else {
    append(mouseLog, false);
  }
  if (mouseLog.length > 2) {
    for (var i = 0; i < mouseLog.length; i++) {
      if (i == mouseLog.length - 1) {
        mouseLog.pop();
      } else {
        mouseLog[i] = mouseLog[i + 1];
      }
    }
  }
}

function cascade(i, j) {
  for (let n = 1; n < 2; n++) {
    if (i - n > 0 && i - n <= mineWidth - 1 && j >= 0 && j <= mineHeight - 1) {
      if (carr[i - n][j].count == 0 && carr[i - n][j].b == false && i - n >= 0) {
        carr[i - n][j].s = true;
      }
    }
    if (i + n > 0 && i + n <= mineWidth - 1 && j >= 0 && j <= mineHeight - 1) {
      if (carr[i + n][j].count == 0 && carr[i + n][j].b == false && i + n >= 0) {
        carr[i + n][j].s = true;
      }
    }
    if (i <= mineWidth - 1 && j - n >= 0 && j - n <= mineHeight - 1) {
      if (carr[i][j - n].count == 0 && carr[i][j - n].b == false && i >= 0) {
        carr[i][j - n].s = true;
      }
    }
    if (i <= mineWidth - 1 && j + n >= 0 && j + n <= mineHeight - 1) {
      if (carr[i][j + n].count == 0 && carr[i][j + n].b == false && i >= 0) {
        carr[i][j + n].s = true;
      }
    }

    if (i + n >= 0 && i + n <= mineWidth - 1 && j - n >= 0 && j - n <= mineHeight - 1) {
      if (carr[i + n][j - n].count == 0 && carr[i + n][j - n].b == false && i + n >= 0) {
        carr[i + n][j - n].s = true;
      }
    }
    if (i + n >= 0 && i + n <= mineWidth - 1 && j + n >= 0 && j + n <= mineHeight - 1) {
      if (carr[i + n][j + n].count == 0 && carr[i + n][j + n].b == false && i + n >= 0) {
        carr[i + n][j + n].s = true;
      }
    }
    if (i - n >= 0 && i - n <= mineWidth - 1 && j - n >= 0 && j - n <= mineHeight - 1) {
      if (carr[i - n][j - n].count == 0 && carr[i - n][j - n].b == false && i - n >= 0) {
        carr[i - n][j - n].s = true;
      }
    }
    if (i - n >= 0 && i - n <= mineWidth - 1 && j + n >= 0 && j + n <= mineHeight - 1) {
      if (carr[i - n][j + n].count == 0 && carr[i - n][j + n].b == false && i - n >= 0) {
        carr[i - n][j + n].s = true;
      }
    }
  }
}


function reset() {
  carr = [];
  setup();
}

function check() {
  for (let i = 0; i < mineWidth; i++) {
    for (let j = 0; j < mineHeight; j++) {
      if (i + 1 >= 0 && i + 1 <= mineWidth - 1 && j >= 0 && j <= mineHeight - 1) {
        if (carr[i + 1][j].b == true) {
          carr[i][j].count++;
        }
      }
      if (i - 1 >= 0 && i - 1 <= mineWidth - 1 && j >= 0 && j <= mineHeight - 1) {
        if (carr[i - 1][j].b == true) {
          carr[i][j].count++;
        }
      }
      if (i >= 0 && i <= mineWidth - 1 && j - 1 >= 0 && j - 1 <= mineHeight - 1) {
        if (carr[i][j - 1].b == true) {
          carr[i][j].count++;
        }
      }
      if (i >= 0 && i <= mineWidth - 1 && j + 1 >= 0 && j + 1 <= mineHeight - 1) {
        if (carr[i][j + 1].b == true) {
          carr[i][j].count++;
        }
      }
      if (i + 1 >= 0 && i + 1 <= mineWidth - 1 && j - 1 >= 0 && j - 1 <= mineHeight - 1) {
        if (carr[i + 1][j - 1].b == true) {
          carr[i][j].count++;
        }
      }
      if (i + 1 >= 0 && i + 1 <= mineWidth - 1 && j + 1 >= 0 && j + 1 <= mineHeight - 1) {
        if (carr[i + 1][j + 1].b == true) {
          carr[i][j].count++;
        }
      }
      if (i - 1 >= 0 && i - 1 <= mineWidth - 1 && j - 1 >= 0 && j - 1 <= mineHeight - 1) {
        if (carr[i - 1][j - 1].b == true) {
          carr[i][j].count++;
        }
      }
      if (i - 1 >= 0 && i - 1 <= mineWidth - 1 && j + 1 >= 0 && j + 1 <= mineHeight - 1) {
        if (carr[i - 1][j + 1].b == true) {
          carr[i][j].count++;
        }
      }
    }
  }
}

function Cell(i, j, w, b) {
  this.i = i;
  this.j = j;
  this.w = w;
  this.b = b;
  this.count = 0;
  this.s = false;
  this.f = false;
  this.draw = function() {
    if (this.s) {
      push();
      fill(150);
      rect(i * w, j * w, w, w);
      if (b === true) {
        fill(0);
        ellipse((i * w) + w / 2, (j * w) + w / 2, w / 2, w / 2);
      } else {
        if (this.count == 1) {
          fill(0, 255, 0);
        } else if (this.count == 2) {
          fill(0, 0, 255);
        } else if (this.count == 3) {
          fill(255, 0, 0);
        } else if (this.count == 4) {
          fill(255, 255, 0);
        } else if (this.count == 6) {
          fill(255, 0, 255);
        } else if (this.count == 7) {
          fill(0, 255, 255);
        } else if (this.count == 8) {
          fill(255);
        }
        if (this.count != 0) {
          noStroke();
          text(this.count, (i * w) + 10, (j * w) + 20);
        }
      }
      pop();
    } else {
      push();
      if (this.f) {
        fill(75);
        rect(i * w, j * w, w, w);
        fill(50, 0, 0);
        ellipse((i * w) + w / 2, (j * w) + w / 2, w / 2, w / 2);
      } else {
        fill(75);
        rect(i * w, j * w, w, w);
        pop();
      }
    }
  }
}

function flash() {
  for (let i = 0; i < mineWidth; i++) {
    for (let j = 0; j < mineHeight; j++) {
      if (carr[i][j].b) {
        carr[i][j].s = true;
        carr[i][j].draw();
      }
    }
  }
}
