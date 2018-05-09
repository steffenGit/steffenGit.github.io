"use strict";

const DT = 0.1;

class Body {
  constructor(pos, mass, v, universe) {
    this.pos = pos || createVector(0, 0);
    this.mass = mass;
    this.v = v || createVector(0, 0);
    this.r = this.mass;
    this.a = createVector(0, 0);
    this.universe = universe;
  }

  setR(r) {
    this.r = r;
  }

  update() {
    this.v.add(this.a);
    this.pos.add(this.v);
    this.a.mult(0);
    if (this.pos.x < 0
        || this.pos.x > width
        || this.pos.y < 0
        || this.pos.y > height) {
      return false;
    }
    return true;
  }

  applyForce(force) {
    this.a.add(force.div(this.mass));
  }

  draw() {
    stroke(40, 40, 200);
    fill(40, 200, 80);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Body;
}
