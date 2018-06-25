"use strict";


class Hive extends Entity{
  constructor(pos, world) {
    super(pos);
    this.foodAmount = 0;
    this.world = world;
  }

  dropFood(amount) {
    this.foodAmount += amount;
  }

  draw() {
    fill(255, 100, 100);
    ellipse(this.position.x, this.position.y, 30);
  }

}


if(typeof module !== 'undefined') {
  module.exports = Hive;
}