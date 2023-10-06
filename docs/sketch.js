let ball;

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

    ball = createVector(width / 2, height / 2);
}

function draw() {
  background(0);
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  text(str(rotationX), width / 2, 200);
  text(str(rotationY), width / 2, 300);
  text(str(rotationZ), width / 2, 400);
  pop();
}