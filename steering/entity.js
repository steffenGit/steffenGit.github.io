"use strict";

class Entity {
  constructor(x, y) {
    this.position = createVector(x, y);
  }

  update() {

  }

  draw() {

  }
}

if(typeof module !== 'undefined') {
  module.exports = Entity;
}