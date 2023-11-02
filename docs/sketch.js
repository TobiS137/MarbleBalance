let ballPos;
let ballVel;
let ballSize = 100;

let friction = 0.5;

const mq = window.matchMedia("(max-width: 480px)");

let walls = [];

function setup() {
  let canvas = createCanvas(windowHeight / 20 * 10.5, windowHeight);
  textSize(36);
  pixelDensity(1);

  // giver canvas border på 2 pixel, 
  // og sørger derefter for at kanten tælles med i width
  canvas.elt.style.border = '5px solid black';
  canvas.elt.style.boxSizing = 'border-box';
  canvas.elt.style.borderRadius = '20px';
  
  document.getElementById("beholder").appendChild(canvas.elt);

  ballPos = createVector(width / 2, height / 2);
  ballVel = createVector(5, 0);
  
  walls.push(new Wall(width / 4, width - width / 4, height / 4, height - height / 4));
}

function draw() {
  resizeCanvas((mq.matches) ? windowWidth : windowHeight / 20 * 10.5, windowHeight);
  background(0);
  push();
  fill(255);
  wall.draw();
  textAlign(CENTER, CENTER);
  text("!!!!", width / 2, 100);
  text("X: " + str(int(rotationX)), width / 2, 200);
  text("Y: " + str(int(rotationY)), width / 2, 300);
  text("Vel: (" + str(ballVel.x) + ", " + str(ballVel.y) + ")", width / 2, 400);
  pop();
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.r = r;
  }

  update() {
    if (rotationX != undefined && rotationY != undefined) {
      if (this.checkCollisions(walls, this.pos.x + this.vel.x + int(rotationY) / 50, this.pos.y, this.r).length <= 0) {
        this.vel.x += int(rotationY) / 50;
      }
      if (this.checkCollisions(walls, this.pos.x, this.pos.y + this.vel.y + constrain(int(rotationX), -90, 90) / 50, this.r).length <= 0) {
        this.vel.y += constrain(int(rotationX), -90, 90) / 50;
      }
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    respondCollision(checkCollisions(walls));
  }

  draw() {
    push();
    colorMode(HSB, 1);
    fill(map(ballPos.y, 0, height, 0, 1), map(ballPos.x, 0, width, 0, 1), 1);
    circle(ballPos.x, ballPos.y, ballSize);
    pop();
  }

  checkCollisions(walls, x, y, r) {
    let hits = [];
    walls.forEach((wall) => {
      let hit = wall.collide(x, y, r);
      if (hit[0] != false) {
        hits.push(hit);
      }
    });
    return hits;
  }
  
  respondCollision(hits) {
    
  }


}

class Wall {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  draw() {
    push();
    stroke(255);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    pop();
  }

  collide(bx, by, br) {
    return lineCircle(a.x, a.y, b.x, b.y, bx, by, br);
  }

  getNormal() {
    let inputVector = createVector(b.x - a.x, b.y - a.y);
    return createVectorVector(inputVector.y * -1, inputVector.x).normalize();
  }
}

function lineCircle(x1, y1, x2, y2, cx, cy, r) {

  // is either end INSIDE the circle?
  // if so, return true immediately
  if (dist(a.x, a.y, ball.pos.x, ball.pos.y) < ball.r) {
      return [true, a];
  } else if (dist(b.x, b.y, ball.pos.x, ball.pos.y) < ball.r) {
      return [true, a];
  }

  // get length of the line
  distX = x1 - x2;
  distY = y1 - y2;
  len = sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

  // find the closest point on the line
  closestX = x1 + (dot * (x2-x1));
  closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
  if (!onSegment) return [false, null];

  // optionally, draw a circle at the closest
  // point on the line
  fill(255,0,0);
  noStroke();
  ellipse(closestX, closestY, 20, 20);

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  distance = sqrt( (distX*distX) + (distY*distY) );

  if (distance <= r) {
    return [true, createVector(closestX, closestY)];
  }
  return [false, null];
}

function pointCircle(px, py, cx, cy, r) {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  distX = px - cx;
  distY = py - cy;
  distance = sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}

function linePoint(x1, y1, x2, y2, px, py) {

  // get distance from the point to the two ends of the line
  d1 = dist(px,py, x1,y1);
  d2 = dist(px,py, x2,y2);

  // get the length of the line
  lineLen = dist(x1,y1, x2,y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #
  if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
}