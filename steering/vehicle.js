"use strict";

class Vehicle extends Entity{
  constructor(x, y) {
    super(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.r = 7;
    this.maxForce = 0;
    this.maxSpeed = 0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(vForce) {
    this.acceleration.add((vForce));
  }

  /**
   * steers towards target at maxspeed
   * @param vTarget
   */
  seek(vTarget) {
    let desired = p5.Vector.sub(vTarget, this.position);
    desired.setMag(this.maxSpeed);
    this.steer(desired);

  }

  stop() {
    let desired = createVector(0,0);
    this.steer(desired);
  }

  /**
   * steers towards target at full speed, breaks when in breakingDistance
   * @param vTarget
   */
  arrive(vTarget, breakingDistance, arrivalDistance) {
    let desired = p5.Vector.sub(vTarget, this.position);
    let d = desired.mag();
    if(d < arrivalDistance) {
      this.onArrival();
    }
    if(d < breakingDistance) {
      let m = map(d, 0, breakingDistance, 0, this.maxSpeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxSpeed);
    }
    this.steer(desired);
  }

  onArrival() {
    console.log('mission accomplished');
  }


  steer(vDesired) {
    let steer = p5.Vector.sub(vDesired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  draw() {
    let theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape();
    pop();
  }


}

if(typeof module !== 'undefined') {
  module.exports = Vehicle;
}