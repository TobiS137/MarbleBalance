let ballPos;
let ballVel;


function setup() {
  canvas = createCanvas(300, 500, 'beholder');
  textSize(18);
  // giver canvas border på 2 pixel, 
  // og sørger derefter for at kanten tælles med i width
  canvas.elt.style.border = '5px solid black';
  canvas.elt.style.boxSizing = 'border-box';
  canvas.elt.style.borderRadius = '20px';
  canvas.parent('#beholder');
  // gør canvas-elementet responsivt til skærmbredden
  canvas.elt.style.width = '100%';    canvas.elt.style.height = '100%';
  //bemærk at noden skal pakkes ud via .elt
  const parentDiv = select('#beholder').elt;
  // indsæt canvas i ny position i rækkefølgen af elementer i div'en beholder
  parentDiv.appendChild(canvas.elt);

  ballPos = createVector(width / 2, height / 2);
  ballVel = createVector(0, 0);

  print(ballPos);
}

function draw() {
  print(ballPos);
  background(0);
  push();
  ballVel.x += rotationY / 100;
  ballVel.y += constrain(rotationX, -90, 90) / 100;
  ballPos.x += ballVel.x;
  ballPos.y += ballVel.y;
  colorMode(HSB, 1);
  fill(map(ballPos.y, 0, height, 0, 1), map(ballPos.x, 0, width, 0, 1), 1);
  circle(ballPos.x, ballPos.y, 50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("!!", width / 2, 50);
  text("X: " + str(int(rotationX)), width / 2, 100);
  text("Y: " + str(int(rotationY)), width / 2, 200);
  text("Z: " + str(int(rotationZ)), width / 2, 300);
  text("(" + str(ballPos.x) + ", " + str(ballPos.y) + ")", width / 2, 400);
  pop();
}