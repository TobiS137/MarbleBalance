let ballPos;
let ballVel;


function setup() {
  canvas = createCanvas(300, 500, 'beholder');
    textSize(24);
    // giver canvas border på 2 pixel, 
    // og sørger derefter for at kanten tælles med i width
    canvas.elt.style.border = '5px solid black';
    canvas.elt.style.boxSizing = 'border-box';
    canvas.elt.style.borderRadius = '20px';
    canvas.parent('#beholder');
    // gør canvas-elementet responsivt til skærmbredden
    canvas.elt.style.width = '100%';
    canvas.elt.style.height = '100%';
    //bemærk at noden skal pakkes ud via .elt
    const parentDiv = select('#beholder').elt;
    // indsæt canvas i ny position i rækkefølgen af elementer i div'en beholder
    parentDiv.appendChild(canvas.elt);

    ballPos = createVector(width / 2, height / 2);
    ballVel = createVector(0, 0);

}

function draw() {
  background(0);
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  text("1", width / 2, 50);
  text("X: " + str(int(rotationX)), width / 2, 150);
  text("Y: " + str(int(rotationY)), width / 2, 300);
  text("Z: " + str(int(rotationZ)), width / 2, 450);
  ballVel.x += clamp(rotationX, -90, 90) / 10;
  ballVel.y += rotationY / 10;
  ballPos += ballVel;
  colorMode(HSB, 1);
  fill(map(ballPos.y, 0, height, 0, 1), map(ballPos.x, 0, width, 0, 1), 0);
  circle(ballPos.x, ballPos.y, 50);
  pop();
}