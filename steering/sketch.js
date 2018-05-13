"use strict";

let world;
function setup() {
  createCanvas(1200, 700);

  world = new World();
  let hive = new Hive(createVector(600, 300),world);
  world.setHive(hive);
  for(let i = 0; i < 20; i++) {
    world.addAnt(new Ant(hive.position.copy(), world));
  }
}

function draw() {
  background(200);
  world.update();
  world.draw();
}

function mouseClicked() {
  world.addFood(new Food(createVector(mouseX, mouseY), 200));
}