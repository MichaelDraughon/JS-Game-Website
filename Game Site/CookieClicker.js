var Cookies=0;

var mouseLog=[];

var mouseLog5=[];

var mouseLog15=[];

var t=true;
var f=false;

var clicked=0;

var fiveMultiplier=0;
var fifteenMultiplier=0;

function setup() {
  createCanvas(windowWidth-5, windowHeight-5);
  background(51);
  frameRate(30);
}
function draw() {
  background(51);
  fill(255);
  textSize(25);
  if (Cookies==0) {
    text("Number of cookies: "+(Cookies), 20,30);
  } else {
    text("Number of cookies: "+(Cookies-1), 20,30);
  }
  ellipse(width/2,height/2,200,200);
  cookie5();
  cookie15();
  if (mouseX>((width/2)-100) && mouseX<((width/2)+100) && mouseY<((height/2)+100) && mouseY>((height/2)-100)) {
    mouseLogs();
    if (mouseLog[0]==false && mouseLog[0]!=mouseLog[1]) {
      Cookies+=1;
    }
  }
  if (frameCount%30==0) {
    Cookies+=(5*fiveMultiplier);
    Cookies+=(15*fifteenMultiplier);
  }
}

function mouseTrack5() {
  if (mouseIsPressed) {
    append(mouseLog5, t);
  } else {
    append(mouseLog5, f);
  }
  if (mouseLog5.length>2) {
    for (var i=0; i<mouseLog5.length; i++) {
      if (i==mouseLog5.length-1) {
        mouseLog5.pop();
      } else {
        mouseLog5[i]=mouseLog5[i+1];
      }
    }
  }
}

function mouseTrack15() {
  if (mouseIsPressed) {
    append(mouseLog15, t);
  } else {
    append(mouseLog15, f);
  }
  if (mouseLog15.length>2) {
    for (var i=0; i<mouseLog15.length; i++) {
      if (i==mouseLog15.length-1) {
        mouseLog15.pop();
      } else {
        mouseLog15[i]=mouseLog15[i+1];
      }
    }
  }
}

function mouseLogs() {
  if (mouseIsPressed) {
    append(mouseLog, t);
  } else {
    append(mouseLog, f);
  }
  if (mouseLog.length>2) {
    for (var i=0; i<mouseLog.length; i++) {
      if (i==mouseLog.length-1) {
        mouseLog.pop();
      } else {
        mouseLog[i]=mouseLog[i+1];
      }
    }
  }
}

function cookie5() {
  if (Cookies>=11) {
    rect((width*0.75),200,200,100);
    fill(0);
    textSize(15);
    text("Five auto clicker (10 Cookies)",((width*0.75)+5), 250);
    fill(255);
    textSize(25);
    mouseTrack5();
    if (mouseX<(width*0.75)+200 && mouseX>(width*0.75) && mouseY>200 && mouseY<300 && mouseLog5[0]==false && mouseLog5[0]!=mouseLog5[1]) {
      Cookies-=10;
      fiveMultiplier++;
    }
  }
}

function cookie15() {
  if (Cookies>=101) {
    rect((width*0.75),400,200,100);
    fill(0);
    textSize(12);
    text("Fifteen auto clicker (100 Cookies)",((width*0.75)+5), 450);
    fill(255);
    textSize(25);
    mouseTrack15();
    if (mouseX<(width*0.75)+200 && mouseX>(width*0.75) && mouseY>400 && mouseY<500 && mouseLog15[0]==false && mouseLog15[0]!=mouseLog15[1]) {
      Cookies-=100;
      fifteenMultiplier++;
    }
  }
}
