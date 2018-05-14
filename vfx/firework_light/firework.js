"use strict";

class Firework extends Particle {
  constructor() {
    let pos = createVector(random(width), height);
    let v = createVector(0, 0);
    let a = createVector(0, -random() * 5 - 10);
    let opt = {
      c: color(Math.floor(random(50) + 200),
          Math.floor(random(50) + 200),
          Math.floor(random(50) + 200)),
      r: Math.floor(random(4) + 2)
    };
    super(pos, v, a, opt);
  }

}
