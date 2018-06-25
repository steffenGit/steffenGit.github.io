"use strict";

class World {
  constructor() {
    this.hive = null;
    this.ants = [];
    this.foods = [];
    this.pheromones = [];
  }

  addFood(food) {
    this.foods.push(food);
  }

  addPheromone(pheromone) {
    this.pheromones.push(pheromone);
  }

  addAnt(ant) {
    this.ants.push(ant);
  }

  setHive(hive) {
    this.hive = hive;
  }

  update() {
    this.hive.update();
    this.ants.forEach(a => {
      a.update();
    });
    this.foods.forEach((f, i) => {
      f.update();
      if(f.amount <= 0) this.foods.splice(i, 1);
    });
    this.pheromones.forEach((p, i) => {
      p.update();
      if(p.age > p.ttl) this.pheromones.splice(i, 1);
    });
  }

  draw() {
    this.hive.draw();
    this.ants.forEach(a => {
      a.draw();
    });
    this.foods.forEach(f => {
      f.draw();
    });
    this.pheromones.forEach(p => {
      p.draw();
    });
  }



  perceive(pos, dist) {
    let res = {
      hive: null,
      foods: [],
      pheromones : []
    };
    if(p5.Vector.dist(pos, this.hive.position) <= dist) res.hive = this.hive;
    this.foods.forEach(f => {
      if(p5.Vector.dist(pos, f.position) <= dist) res.foods.push(f);
    });
    this.pheromones.forEach(p => {
      if(p5.Vector.dist(pos, p.position) <= dist) res.pheromones.push(p);
    });

    return res;
  }
}

if(typeof module !== 'undefined') {
  module.exports = World;
}