const friction = 0.5;

const mq = window.matchMedia("(max-width: 480px)");

let ball;
let squares = [];
let bounds = [];

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

  ball = new Ball(width / 2, height / 2, 50);
  //squares.push(new Square(width / 2, height / 2, 75));
  loadBounds();
  
}

function draw() {
  frameRate(map(mouseX, 1, width, 0, 60));
  background(0);
  push();
  squares.forEach((square) => {
    square.draw();
  });
  bounds.forEach((wall) => {
    wall.draw();
  });
  ball.update();
  ball.draw();
  fill(255);
  textAlign(CENTER, CENTER);
  text("!!!!", width / 2, 100);
  text("X: " + str(int(rotationX)), width / 2, 200);
  text("Y: " + str(int(rotationY)), width / 2, 300);
  pop();
}

function windowResized() {
  resizeCanvas((mq.matches) ? windowWidth : windowHeight / 20 * 10.5, windowHeight);
  loadBounds();
}

function loadBounds() {
  bounds = [];
  bounds.push(new Wall(-1, height / 4 * 3, width + 1, height + 1));
  bounds.push(new Wall(-2, -2, width + 2, -2));
  bounds.push(new Wall(width + 2, -2, width + 2, height + 2));
  bounds.push(new Wall(width + 2, height + 2, -2, height + 2));
  bounds.push(new Wall(-2, height + 2, -2, -2));
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 5);
    this.r = r;
  }

  update() {
    let hit = this.checkCollisions(squares, bounds, this.pos.x, this.pos.y, this.r);
    //print(hit);
    if (rotationX != undefined && rotationY != undefined) {
      if (this.checkCollisions(squares, bounds, this.pos.x + this.vel.x + int(rotationY) / 50, this.pos.y, this.r) == null) {
        this.vel.x += int(rotationY) / 50;
      }
      if (this.checkCollisions(squares, bounds, this.pos.x, this.pos.y + this.vel.y + constrain(int(rotationX), -90, 90) / 50, this.r) == null) {
        this.vel.y += constrain(int(rotationX), -90, 90) / 50;
      }
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.respondCollision(hit);
  }

  draw() {
    push();
    colorMode(HSB, 1);
    fill(map(this.pos.y, 0, height, 0, 1), map(this.pos.x, 0, width, 0, 1), 1);
    circle(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }

  checkCollisions(squares, bounds, x, y, r) {
    for (let i = 0; i < squares.length; i++) {
      let square = squares[i];
      for (let j = 0; j < square.walls.length; j++) {
        let wall = square.walls[j];
        let hit = wall.collide(x, y, r);
        //console.log(hit[0]);
        if (hit[0]) {
          hit[2] = wall.getNormal();
          return hit;
        }
      }
    }

    for (let i = 0; i < bounds.length; i++) {
      let wall = bounds[i];
      let hit = wall.collide(x, y, r);
      //console.log(hit[0]);
      if (hit[0]) {
        hit[2] = wall.getNormal();
        return hit;
      }
    }
    return null;
  }

  respondCollision(hit) {
    //console.log(hit);
    if (hit != null && hit[0]) {
      print(hit[1]);
      let newPos = p5.Vector.sub(this.pos, hit[1]);
      newPos.setMag(this.r + 4 );
      this.pos = p5.Vector.add(hit[1], newPos);
      this.vel.reflect(hit[2]);
    }
  }
}

class Square {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    let hs = s / 2;
    this.walls = [
      new Wall(this.x - hs, this.y - hs, this.x + hs, this.y - hs),
      new Wall(this.x + hs, this.y - hs, this.x + hs, this.y + hs),
      new Wall(this.x + hs, this.y + hs, this.x - hs, this.y + hs),
      new Wall(this.x - hs, this.y + hs, this.x - hs, this.y - hs)
    ];
  }

  draw() {
    this.walls.forEach((wall) => {
      wall.draw();
    });
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
    return lineCircle(this.a.x, this.a.y, this.b.x, this.b.y, bx, by, br);
  }

  getNormal() {
    let inputVector = createVector(this.b.x - this.a.x, this.b.y - this.a.y);
    return createVector(inputVector.y * -1, inputVector.x).normalize();
  }
}

function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  // is either end INSIDE the circle? 
  // if so, return true immediately
  if (dist(x1, y1, cx, cy) < r) {
      return [true, this.a];
  } else if (dist(x2, y2, cx, cy) < r) {
      return [true, this.b];
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