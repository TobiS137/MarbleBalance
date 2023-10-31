let ballPos;
let ballVel;

let ballSize = 50;

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
  print(ballPos);
  background(0);
  push();
  ballVel.x += int(rotationY) / 100;
  ballVel.y += constrain(int(rotationX), -90, 90) / 100;
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
  if (ballPos.x - ballSize < 0) {
    n = createVector(1, 0);
    colliding = true;
  }
  if (ballPos.x + ballSize > 0) {
    n = createVector(-1, 0);
    colliding = true;
  }
  if (ballPos.y - ballSize < 0) {
    n = createVector(0, 1);
    colliding = true;
  }
  if (ballPos.y + ballSize > 0) {
    n = createVector(0, -1);
    colliding = true;
  }

  if (colliding) {
    ballVel = -(2*(n * ballVel) * n - ballVel);
  }
}