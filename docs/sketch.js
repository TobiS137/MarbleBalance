let ballPos;
let ballVel;
let ballSize = 50;

let friction = 0.2;

const mq = window.matchMedia("(max-width: 480px)");

function setup() {
  let canvas = createCanvas(windowHeight / 20 * 11, windowHeight);
  textSize(36);

  // giver canvas border på 2 pixel, 
  // og sørger derefter for at kanten tælles med i width
  canvas.elt.style.border = '5px solid black';
  canvas.elt.style.boxSizing = 'border-box';
  canvas.elt.style.borderRadius = '20px';
  
  document.getElementById("beholder").appendChild(canvas.elt);

  ballPos = createVector(width / 2, height / 2);
  ballVel = createVector(10, 0);
  pixelDensity(1);
}

function draw() {
  print(ballVel);
  resizeCanvas(windowHeight / 20 * ((mq.matches) ? windowWidth : 10.5), windowHeight);
  //print(ballPos);
  background(0);
  push();
  if (rotationX != undefined && rotationY != undefined) {
    ballVel.x += int(rotationY) / 100;
    ballVel.y += constrain(int(rotationX), -90, 90) / 100;
  }
  ballPos.x += ballVel.x;
  ballPos.y += ballVel.y;
  checkBounds(ballPos);
  colorMode(HSB, 1);
  fill(map(ballPos.y, 0, height, 0, 1), map(ballPos.x, 0, width, 0, 1), 1);
  circle(ballPos.x, ballPos.y, 50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("!!!!", width / 2, ballSize);
  text("X: " + str(int(rotationX)), width / 2, 100);
  text("Y: " + str(int(rotationY)), width / 2, 200);
  text("Z: " + str(int(rotationZ)), width / 2, 300);
  pop();
}

function checkBounds(ballPos) {
  let n;
  let colliding = false;
  if (ballPos.x - ballSize / 2 < 0) {
    n = createVector(1, 0);
    ballPos.x = ballSize / 2 + 2;
    colliding = true;
  }
  if (ballPos.x + ballSize / 2 > width) {
    n = createVector(-1, 0);
    ballPos.x = width - ballSize / 2 - 2;
    colliding = true;
  }
  if (ballPos.y - ballSize / 2 < 0) {
    n = createVector(0, 1);
    ballPos.y = ballSize / 2 + 2;
    colliding = true;
  }
  if (ballPos.y + ballSize / 2 > height) {
    n = createVector(0, -1);
    ballPos.y = height - ballSize / 2 - 2;
    colliding = true;
  }

  if (colliding) {
    ballVel = ballVel.reflect(n);
    ballVel = ballVel.setMag(ballVel.mag() * (1 - friction));
  }
}