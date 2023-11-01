let ballPos;
let ballVel;
let ballSize = 100;

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
  ballVel = createVector(0, 0);
  pixelDensity(1);
}

function draw() {
  resizeCanvas(windowHeight / 20 * ((mq.matches) ? windowWidth : 10.5), windowHeight);
  background(0);
  push();
  if (rotationX != undefined && rotationY != undefined) {
    if (ballPos.x + ballVel.x + int(rotationY) / 100 > 0 && ballPos.x + ballVel.x + int(rotationY) / 100 < width) {
      ballVel.x += int(rotationY) / 100;
    }
    if (ballPos.y + ballVel.y + constrain(int(rotationX), -90, 90) / 100 > 0 && ballPos.x + ballVel.x + constrain(int(rotationX), -90, 90) / 100 < width) {
      ballVel.y += constrain(int(rotationX), -90, 90) / 100;
    }
  }
  ballPos.x += ballVel.x;
  ballPos.y += ballVel.y;
  checkBounds(ballPos);
  colorMode(HSB, 1);
  fill(map(ballPos.y, 0, height, 0, 1), map(ballPos.x, 0, width, 0, 1), 1);
  circle(ballPos.x, ballPos.y, ballSize);
  fill(255);
  textAlign(CENTER, CENTER);
  text("!!!!", width / 2, ballSize);
  text("X: " + str(int(rotationX)), width / 2, 100);
  text("Y: " + str(int(rotationY)), width / 2, 200);
  text("Vel: (" + str(ballVel.x) + ", " + str(ballVel.y) + ")", width / 2, 300);
  pop();
}

function checkBounds(ballPos) {
  if (ballPos.x - ballSize / 2 < 0) {
    ballPos.x = ballSize / 2 + 2;
    if (ballVel.x < 0) {
      ballVel.x = ballVel.x * (-1 + friction);
    }
    if (abs(ballVel.x) < 0.1) {
      ballVel.x = 0;
    }
  }
  if (ballPos.x + ballSize / 2 > width) {
    ballPos.x = width - ballSize / 2 - 2;
    if (ballVel.x > 0) {
      ballVel.x = ballVel.x * (-1 + friction);
    }
    if (abs(ballVel.x) < 0.1) {
      ballVel.x = 0;
    }
  }
  if (ballPos.y - ballSize / 2 < 0) {
    ballPos.y = ballSize / 2 + 2;
    if (ballVel.y < 0) {
      ballVel.y = ballVel.y * (-1 + friction);
    }
    if (abs(ballVel.y) < 0.1) {
      ballVel.y = 0;
    }
  }
  if (ballPos.y + ballSize / 2 > height) {
    ballPos.y = height - ballSize / 2 - 2;
    if (ballVel.y > 0) {
      ballVel.y = ballVel.y * (-1 + friction);
    }
    if (abs(ballVel.y) < 0.1) {
      ballVel.y = 0;
    }
  }
}