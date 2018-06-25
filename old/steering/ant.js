"use strict";

class Ant extends Vehicle {
  constructor(pos, world) {
    super(pos);
    this.maxSpeed = 1;
    this.maxForce = 0.1;
    this.pheromoneDistance = 50;
    this.perceptionDistance = 200;
    this.state = 'food';
    this.lastPheromonePos = pos.copy();
    this.distanceTravelled = 0;
    this.world = world;
    this.targetEntity = null;
    this.wanderTarget = null;
    this.wanderRadius = 200;
    this.food = 0;
    this.maxFood = 50;
  }


  update() {
    super.update();
    this.decideOnPheromoneDrop();
    let perceived = this.world.perceive(this.position, this.perceptionDistance);
    switch (this.state) {
      case 'food':
        this.findFood(perceived);
        return;
      case 'home':
        this.findHome(perceived);
        return;
      default:
        throw Error('unknown state');
    }

  }


  decideOnPheromoneDrop() {
    // if there is no more food in the target
    if (this.state === 'home' && !this.food) return;

    let d = p5.Vector.dist(this.position, this.lastPheromonePos);
    this.distanceTravelled += d;
    if (d > this.pheromoneDistance) {
      let t;
      if (this.state === 'food') t = 'home';
      else t = 'food';
      let p = new Pheromone(this.position.copy(), p5.Vector.sub(this.lastPheromonePos, this.position), t, 500, this.distanceTravelled);
      world.addPheromone(p);
      this.lastPheromonePos = this.position.copy();
    }
  }

  findHome(perceived) {
    if (perceived.hive) {
      // we can see our home
      this.wanderTarget = null;
      this.arrive(perceived.hive.position);
      this.targetEntity = perceived.hive;
      //console.log('setting target to hive');
    } else {
      this.targetEntity = null;
      let closestToHome = null;
      let closestDistance = Number.MAX_SAFE_INTEGER;
      perceived.pheromones.forEach(p => {
        if (p.type === 'home' && p.distance < closestDistance) {
          closestDistance = p.distance;
          closestToHome = p;
        }
      });
      if (closestToHome) {
        // there is a pheromone pointing home
        this.wanderTarget = null;
        this.arrive(p5.Vector.add(closestToHome.position, closestToHome.dir));
      } else {
        // we need to search
        this.wander();
      }
    }
  }

  findFood(perceived) {
    if (perceived.foods.length > 0) {
      this.wanderTarget = null;
      // we can see our home
      let f = perceived.foods[0];
      this.arrive(f.position);
      this.targetEntity = f;
      //console.log('setting targetentity to food');
    } else {
      this.targetEntity = null;
      let closestToFood = null;
      let closestDistance = Number.MAX_SAFE_INTEGER;
      perceived.pheromones.forEach(p => {
        if (p.type === 'food' && p.distance < closestDistance) {
          closestDistance = p.distance;
          closestToFood = p;
        }
      });
      if (closestToFood) {
        this.wanderTarget = null;
        // there is a pheromone pointing to food
        this.arrive(p5.Vector.add(closestToFood.position, closestToFood.dir));
      } else {
        // we need to search
        if(this.distanceTravelled > 5000) {
          this.state = 'home';
        }
        else this.wander();
      }
    }
  }

  onArrival() {
    this.distanceTravelled = 0;
    this.stop();
    if (this.wanderTarget) {
      this.pickWanderTarget();
      this.targetEntity = null;
      return;
    }

    if (this.state === 'home') {
      this.state = 'food';
      if (this.targetEntity)
        this.targetEntity.dropFood(this.food);

      this.food = 0;
      //console.log('reached hive');

    } else if (this.state === 'food') {
      this.state = 'home';
      if (this.targetEntity)
        this.food = this.targetEntity.bite(this.maxFood);

      //console.log('reached food');
    }
    this.targetEntity = null;

  }

  wander() {
    if (!this.wanderTarget) {
      this.pickWanderTarget();
    } else {
      this.arrive(this.wanderTarget);
    }
  }

  pickWanderTarget() {
    let dt = createVector(random(-this.wanderRadius, this.wanderRadius), random(-this.wanderRadius, this.wanderRadius));
    this.wanderTarget = p5.Vector.add(this.position, dt);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ant;
}