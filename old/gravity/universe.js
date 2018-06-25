"use strict";


class Universe {
  constructor() {
    this.bodies = [];
    this.minorBodies = [];
  }

  update() {
    this.applyForces();

    this.bodies.forEach(b => {
      b.update();
    });
    this.minorBodies.forEach(b => {
      b.update();
    });

    this.checkCollisions();

  }

  draw() {
    this.bodies.forEach(b => {
      b.draw();
    });
    this.minorBodies.forEach(b => {
      b.draw();
    })
  }

  addBody(body) {
    this.bodies.push(body);
  }

  removeBody(body) {
    let i = this.bodies.indexOf(body);
    if (i >= 0) {
      this.bodies.splice(i, 1);
    }
  }

  addMinorBody(body) {
    this.minorBodies.push(body);
  }

  removeMinorBody(body) {
    let i = this.minorBodies.indexOf(body);
    if (i >= 0) {
      this.minorBodies.splice(i, 1);
    }
  }


  applyForces() {
    this.applyForcesToMinorBodies();
    this.applyForcesToBodies();
  }

  checkCollisions() {
    this.minorBodies.forEach(a => {
      this.bodies.forEach(b => {
        let d = p5.Vector.sub(b.pos, a.pos);
        if(d.mag() < a.r/2 + b.r/2) {
          //console.log('kill');
          this.removeMinorBody(a);
        }
      })
    })
  }

  applyForcesToMinorBodies() {
    this.minorBodies.forEach(a => {
      this.bodies.forEach(b => {
        let d = p5.Vector.sub(b.pos, a.pos);
        // calculate forces between a and b, apply to both;
        let f = (a.mass*b.mass)/(d.mag()**2);
        d.setMag(f);
        a.applyForce(d);
      })
    })
  }

  applyForcesToBodies() {
    let bCopy = this.bodies.slice();
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
  }
}


if (typeof module !== 'undefined') {
  module.exports = Universe;
}
