"use strict";

class Pheromone extends Entity {
  constructor(pos, dir, type, ttl, distance) {
    super(pos);
    this.dir = dir;
    this.type = type;
    this.ttl = ttl;
    this.age = 0;
    this.distance = distance;
  }


  update() {
    this.age++;
    return this.ttl >= this.age;
  }
  draw() {
    let theta = this.dir.heading() + PI/2;

    if(this.type === 'food') {
      fill(120, 200, 120, map(this.age, 0, this.ttl, 255, 0));
      stroke(120, 200, 120, map(this.age, 0, this.ttl, 255, 0));

    } else if (this.type === 'home') {
      fill(200, 120, 200, map(this.age, 0, this.ttl, 255, 0));
      stroke(200, 120, 200, map(this.age, 0, this.ttl, 255, 0));

    }

    strokeWeight(1);
    ellipse(this.position.x, this.position.y, 5);
    let t = p5.Vector.add(this.position, this.dir);
    line(this.position.x, this.position.y, t.x, t.y);
  }
}