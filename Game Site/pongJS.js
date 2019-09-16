var cirX=500;
var cirY=250;
var cirSize=20;
var forwardX;
var forwardY;

var LpaddlePos=100;
var RpaddlePos=100;

var Lscore=0;
var Rscore=0;

var playerNum=0;
var i=0;

function setup() {
  createCanvas(windowWidth-5,windowHeight-5);
  forwardX=1;
  forwardY=1;
  textSize(15);
}

function draw() {
  background(51);
  if (playerNum==0){
    stroke(0)
    fill(150);
    rect((width/2)-100,30,200,150);
    textSize(40);
    text("Welcome to Pong",width/2-155, height/2)
    noStroke();
    fill(0);
    textSize(10);
    if ((mouseX>width/2-75&&mouseX<(width/2-75)+180)&&(mouseY>40&&mouseY<80)) {
      stroke(0);
      fill(150);
      if (mouseIsPressed) {
        playerNum=1;
      }
    }
    text("1 player (mouse controlled)", width/2-75, 80);
    noStroke();
    fill(0);
    if ((mouseX>width/2-75&&mouseX<(width/2-75)+180)&&(mouseY>95&&mouseY<135)) {
      stroke(0);
      fill(150);
      if (mouseIsPressed) {
        playerNum=2;
      }
    }
    text("2 players (left uses WS right uses UJ)", width/2-75, 135);
  }

  if (playerNum!=0) {

    if (playerNum==1){
      LpaddlePos=mouseY;
      RpaddlePos=mouseY;
      stroke(255);
      fill(255);
      rect(width-5,RpaddlePos,5,50);
      rect(0,LpaddlePos,5,50);
    } else if (playerNum==2) {

      movePaddle();

      if (RpaddlePos>height-50) {
        RpaddlePos=height-50;
      } else if (RpaddlePos<0) {
        RpaddlePos=0;
      } else if (LpaddlePos>height-50) {
        LpaddlePos=height-50;
      } else if (LpaddlePos<0) {
        LpaddlePos=0;
      }

      stroke(255);
      fill(255);
      rect(width-5,RpaddlePos,5,50);
      rect(0,LpaddlePos,5,50);
    }

    if (cirX>=width-(cirSize/2)) {
        forwardX=0;
    } else if (cirX<=cirSize/2) {
      forwardX=1;
    }

    if (cirY>=height-(cirSize/2)) {
      forwardY=0;
    } else if (cirY<=cirSize/2) {
      forwardY=1;
    }

    if (forwardX==0) {
      cirX-=5;
    } else if (forwardX==1) {
      cirX+=5;
    }

    if (forwardY==0) {
      cirY-=5;
    } else if (forwardY==1) {
      cirY+=5;
    }

    if (!LisHit(cirY) && cirX<=cirSize/2) {
      cirX=500;
      cirY=250;
      Rscore++;
    }
    if (!RisHit(cirY) && cirX>=width-(cirSize/2)) {
      cirX=500;
      cirY=250;
      Lscore++;
    }

    fill(255,255,255);
    text(Rscore,width-100,20);
    text(Lscore, 100, 20);

    ellipse(cirX,cirY,cirSize,cirSize);

  }
}
function RisHit(y) {
  if (y>=RpaddlePos && y<=RpaddlePos+50) {
    return true;
  } else if (y<=RpaddlePos && y>=RpaddlePos+50) {
    return false;
  }
}

function LisHit(y) {
  if (y>=LpaddlePos && y<=LpaddlePos+50) {
    return true;
  } else if (y<=LpaddlePos && y>=LpaddlePos+50) {
    return false;
  }
}

function movePaddle() {
  if (keyIsDown(83)) {
    LpaddlePos+=10;
  } else if (keyIsDown(87)) {
    LpaddlePos-=10;
  } else if (keyIsDown(74)) {
    RpaddlePos+=10;
  } else if (keyIsDown(85)) {
    RpaddlePos-=10;
  }
  keyCode=0;
}
