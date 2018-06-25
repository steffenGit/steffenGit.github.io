"use strict";
const INTERVAL = 0.01;
function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      stroke(noise(x*INTERVAL,y*INTERVAL)*255);
      point(x,y);
    }
  }
}