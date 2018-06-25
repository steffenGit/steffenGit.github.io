"use strict";

class Shrapnel extends Particle {
  constructor(firework) {
    let v = createVector(0, 0);
    let a = p5.Vector.random2D();
    a.mult(random(2));
    let opt= {
      c: firework.c,
      r: firework.r/2
    };
    super(firework.pos.copy(), v, a, opt);
    this.age = 0;
  }

  update() {
    this.age++;
    this.c.setAlpha(255-this.age*5);
    return super.update();
  }
}