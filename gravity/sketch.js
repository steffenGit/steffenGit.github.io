"use strict";


let bodies = [];

function setup() {
  createCanvas(600, 600);
  let a = new Body(createVector(300, 300), 6000, createVector(0, 0));
  a.setR(100);

  bodies.push(a);


  for(let i = 0; i < 200; i++) {
    let v = random()*5;
    let b = new Body(createVector(random(250), 300), 0.002, createVector(0, v));
    b.setR(5);
    bodies.push(b);
  }
  background(10, 10, 50, 255);

}

function draw() {
  background(10, 10, 50, 255);

  let bCopy = bodies.slice();
  let a;
  while(a = bCopy.pop()) {
    bCopy.forEach(b => {
      let d = p5.Vector.sub(a.pos, b.pos);
      // calculate forces between a and b, apply to both;
      let f = (a.mass*b.mass)/(d.mag()**2);
      let d2 = p5.Vector.sub(b.pos, a.pos);
      d.setMag(f);
      d2.setMag(f);
      a.applyForce(d2);
      b.applyForce(d);
    })
  }

  bodies.forEach(b => {
    if(!b.update()) {
      // TODO: remove from list or spawn new
    }
    b.draw();
  });
}