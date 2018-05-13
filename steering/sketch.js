"use strict";
let vehicles = [];


function setup() {

  createCanvas(600, 600);
  for (let i = 0; i < 1; i++) {
    let v = new Vehicle(random(width), random(height));
    v.maxSpeed = 2;
    v.maxForce = 0.1;
    v.onArrival = function () {
      console.log('done:', v.position);
    };
    vehicles.push(v);
  }
  background(200);
}

function draw() {
  background(200);
  let mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(200);
  stroke(0);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  vehicles.forEach(v => {
    v.flee(mouse, 100, 150);
    v.update();
    v.draw();
  });

}