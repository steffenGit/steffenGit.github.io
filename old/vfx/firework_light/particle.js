"use strict";

class Particle {
  constructor(pos, v, a, options) {
    options = options || {};
    this.pos = pos || createVector(0, 0);
    this.v = v || createVector(0, 0);
    this.a = a || createVector(0, 0);
    this.r = options.r || 10;
    this.c = options.c || 255;
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
    this.a.add(force);
  }

  draw() {
    stroke(this.c);
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

if(typeof module !== 'undefined') {
  module.exports = Particle;
}