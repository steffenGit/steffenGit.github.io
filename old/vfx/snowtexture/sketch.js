"use strict";

let flakes = [];

function setup() {
  createCanvas(600, 400);
  initFlakes(1000);
  background(0);

}

function draw() {
  updateFlakes();
  drawFlakes();
}

function initFlakes(count) {
  for(let i = 0; i < count; i++) {
    let f = {};
    resetFlake(f);
    flakes.push(f);
  }
}

function updateFlakes() {
  flakes.forEach((f => {
    f.y += f.v;
    f.x += random(-f.v, f.v);
    let x = Math.floor(f.x);
    //collision with ground
    if(f.y > height) {
      resetFlake(f);
    }

    // constrain to screen
    if(f.x < 0) f.x = 0;
    if(f.x > width) f.x = width;

  }))
}


function resetFlake(flake) {
  flake.x = random(width);
  flake.y = 0;
  flake.v = random(0.5, 1);
}

function drawFlakes() {
  flakes.forEach(f => {
    stroke(255, 30);
    point(f.x, f.y);
  });
}