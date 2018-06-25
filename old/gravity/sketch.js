"use strict";


let universe = new Universe();
function setup() {
  createCanvas(1200, 800);
  let a = new Body(createVector(300, 300), 6000, createVector(0, 0));
  a.setR(100);

  universe.addBody(a);

  for(let i = 0; i < 600; i++) {
    let v = 4+random()+2;
    let b = new Body(createVector(random(250), 300), 0.002, createVector(0, v));
    b.setR(5);
    universe.addMinorBody(b);
  }
  background(10, 10, 50, 255);

}

function draw() {
  background(10, 10, 50, 255);
  universe.update();
  universe.draw();

}