var turnCode=-1;
var prevTC=-1;

var pacMan=new Pac(250,275,20);

var Score=0;

var foodArr=[];

function setup() {
  createCanvas(510,510);
  background(51);
  fillArray();
}

function draw() {
  background(51);
  translate(5,5);
  showFood(foodArr);
  gotFood(foodArr);
  showScore();
  makeTurn();
  if (turnCode!=-2) {
    prevTC=turnCode;
  }
  if (outOfBounds(pacMan.x, pacMan.y)) {
    turnCode=-2;
    if (prevTC==0 && turnCode==-2) {
      turnCode=1;
    } else if (prevTC==1 && turnCode==-2) {
      turnCode=0;
    } else if (prevTC==2 && turnCode==-2) {
      turnCode=3;
    } else if (prevTC ==3 && turnCode==-2) {
      turnCode=2;
    } else {
      turnCode==-2;
    }
  }
  drawBoard();
  pacMan.move(turnCode);
  pacMan.drawPac(turnCode);
}

function drawBoard() {
  stroke(255);
  strokeWeight(4);
  //barrier
  line(0,0,500,0);
  line(0,0,0,125);
  line(0,125,50,125);
  line(50,125,50,200);
  line(50,200,0,200);
  line(0,250,50,250);
  line(50,250,50,375);
  line(50,375,0,375);
  line(0,375,0,500);
  line(0,500,500,500);
  line(500,500,500,375);
  line(500,375,450,375);
  line(450,375,450,250);
  line(450,250,500,250);
  line(500,200,450,200);
  line(450,200,450,125);
  line(450,125,500,125);
  line(500,125,500,0);

  //maze
    //ghost box
  line(225,250,200,250);
  line(200,250,200,200);
  line(200,200,300,200);
  line(300,200,300,250);
  line(300,250,275,250);
    //dividers
  line(125,200,125,100);
  line(125,125,200,125);
  line(375,200,375,100);
  line(375,125,300,125);

  line(125,300,125,437);
  line(125,437,50,437);
  line(375,300,375,437);
  line(375,437,450,437);

  line(175,300,225,300);
  line(175,300,175,437);

  line(275,300,325,300);
  line(325,300,325,437);

  line(175,437,225,437);
  line(275,437,325,437);

  line(50,50,50,75);
  line(50,50,150,50);

  line(450,50,450,75);
  line(450,50,350,50);

  noFill();
  rect(200,0,100,75);
  fill(255);
}

function outOfBounds(px,py) {
  if (py>200 && py<250 && (px==0)) {
    pacMan.x=500;
  } else if (py>200 && py<250 && (px==500)) {
    pacMan.x=0;
  } else if (px<0 || py<0 || px>500 || py>500) {
    return true;
  } else if ((px<50 || px>450) && py>125 && py<200) {
    return true;
  } else if ((px<50 || px>450) && py>250 && py<375) {
    return true;
  } else if (px>200 && px<300 && py<75) {
    return true;
  } else if (py<200 && py>100 && (px==125 || px==375)) {
    return true;
  } else if (py<437 && py>300 && (px==125 || px==375)) {
    return true;
  } else if (px>50 && px<150 && (py==50)) {
    return true;
  } else if (px>350 && px<450 && (py==50)) {
    return true;
  } else if (py>50 && py<75 && (px==50 || px==450)) {
    return true;
  } else if (px>125 && px<200 && (py==125)) {
    return true;
  } else if (px>300 && px<375 && (py==125)) {
    return true;
  } else if (px>200 && px<300 && py>200 && py<250) {
    return true;
  } else if (px>175 && px <225 && (py==437)) {
    return true;
  } else if (px>275 && px<325 && (py==437)) {
    return true;
  } else if (py>300 && py<437 && (px==175 || px==325)) {
    return true;
  } else if (px>175 && px <225 && (py==300)) {
    return true;
  } else if (px>275 && px<325 && (py==300)) {
    return true;
  } else if (px>50 && px<125 && (py==437)) {
    return true;
  } else if (px>375 && px<450 && (py==437)) {
    return true;
  }
  else {
    return false;
  }
}

function gotFood(arr) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i].b==true && (pacMan.x < (arr[i].x + arr[i].r) && pacMan.x > (arr[i].x - arr[i].r) && pacMan.y < (arr[i].y + arr[i].r) && pacMan.y > (arr[i].y - arr[i].r))) {
      Score++;
      arr[i].b=false;
    }
  }
}

function showFood(arr) {
  for (var i=0; i<foodArr.length; i++) {
    if (arr[i].b==true) {
      foodArr[i].show();
    }
  }
}

function makeTurn() {
  if (keyIsDown(87)) {
    turnCode=0;
  } else if (keyIsDown(83)) {
    turnCode=1;
  } else if (keyIsDown(65)) {
    turnCode=2;
  } else if (keyIsDown(68)) {
    turnCode=3
  }
}

function showScore() {
  noStroke();
  fill(255);
  if (Score==133) {
    text("WINNER",10,15);
  } else {
    text("Score: "+Score,10,15);
  }
  stroke(255);
}

function Pac(x_, y_, size_) {
  this.x=x_;
  this.y=y_;
  this.size=size_;

  this.move = function(turnCode_) {
    if (turnCode_==0) {
      this.y--;
    } else if (turnCode_==1) {
      this.y++;
    } else if (turnCode_==2) {
      this.x--;
    } else if (turnCode_==3) {
      this.x++;
    }
  }

  this.drawPac = function(turnCode__) {
    fill(255,255,0);
    noStroke();
    if (turnCode__==0) {
      arc(this.x,this.y,this.size,this.size,(-PI/4),(-3*PI/4),PIE);
    } else if (turnCode__==1) {
      arc(this.x,this.y,this.size,this.size,(3*PI/4),(PI/4),PIE);
    } else if (turnCode__==2) {
      arc(this.x,this.y,this.size,this.size,(-3*PI/4),(3*PI/4),PIE);
    } else if (turnCode__==3) {
      arc(this.x,this.y,this.size,this.size,(PI/4),(-PI/4),PIE);
    } else if (turnCode__==-1) {
      arc(this.x,this.y,this.size,this.size,(PI/4),(-PI/4),PIE);
    }
    fill(255);
    stroke(255);
  }
}

function Food(x_,y_,r_,b_) {
  this.x=x_;
  this.y=y_;
  this.r=r_;
  this.b=b_;
  this.show = function() {
    rect(this.x,this.y,10,10);
  }
  this.hide = function() {
    noStroke();
    fill(51);
    rect(x,y,10,10);
    stroke(255);
    fill(255);
  }
}

function Ghost(x_, y_) {
  this.x=x_;
  this.y=y_;
  this.show = function() {
    rectMode(CENTER);
    rect(this.x,this.y,20,10);
    rectMode(CORNER); 
  }
}

function fillArray() {
  var t=true;
  var i=0;
  var food=new Food(250,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,425,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(225,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(200,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(175,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,425,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,375,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,350,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,325,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,300,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,275,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,225,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,200,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,175,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(175,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(200,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(225,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(275,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(300,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(325,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,175,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,200,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,225,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,275,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,300,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,325,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,350,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,375,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,425,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(325,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(300,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(275,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,375,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,350,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,325,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,300,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(375,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(425,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(450,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,425,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(450,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(425,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,375,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,350,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,325,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,300,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,275,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(375,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,225,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,200,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,175,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,125,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(425,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(450,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,50,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(475,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(450,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(425,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(375,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(325,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(325,50,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(325,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(325,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(300,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(275,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(250,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(225,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(200,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(175,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(175,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(175,50,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(175,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(125,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(100,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(50,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,25,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,50,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(50,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,100,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,125,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,150,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,175,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,200,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,225,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(100,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(125,250,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,275,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,300,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,325,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,350,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,375,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(50,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,400,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,425,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(25,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(50,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(100,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(125,450,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(150,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(125,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(100,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(75,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(350,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(375,75,10, t);
  foodArr[i]=food;
  i++;
  var food=new Food(400,75,10, t);
  foodArr[i]=food;
  i++;
}
