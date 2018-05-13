"use strict";

class Food extends Entity{
  constructor(pos, amount) {
    super(pos);
    this.amount = amount;

  }

  bite(size) {
    let left = this.amount - size;
    if(left < 0) {
      size = size+left;
    }
    this.amount -= size;
    return size;
  }
  draw() {
    fill(30, 200, 30);
    ellipse(this.position.x, this.position.y, 20);
  }
}

if(typeof module !== 'undefined') {
  module.exports = Food;
}