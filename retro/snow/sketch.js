"use strict";



let grid = [];
let flakes = [];

function setup() {
  createCanvas(600, 400);
  initGrid();
  initFlakes(1000);
}

function draw() {
  background(0);
  updateFlakes();
  drawFlakes();
  drawGrid();
}

function initGrid() {
  for(let i = 0; i < width; i++) {
    grid.push(0);
  }
}

function drawGrid() {
  for(let x = 0; x < width; x++) {
    stroke(255);
    line(x, height, x, height - grid[x]);
  }
}

function initFlakes(count) {
  for(let i = 0; i < count; i++) {
    let f = {};
    resetFlake(f);
    f.y = random(height);
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
      grid[x] = grid[x]+ 1;
      resetFlake(f);
    }

    // constrain to screen
    if(f.x < 0) f.x = 0;
    if(f.x > width) f.x = width;

    //check collision with grid
    if(grid[x] >= height - f.y) {
      grid[x] += 1;


      // check if snow tower is too high
      checkSnowTower(x);
      resetFlake(f);
    }

  }))
}

function checkSnowTower(x) {
  const MAX = 2;
  if(x > 0 && grid[x] - grid[x-1] > MAX) {
    grid[x]--;
    grid[x-1]++;
    checkSnowTower(x+1);
  } else if(x < width && grid[x] - grid[x+1] > MAX) {
    grid[x]--;
    grid[x+1]++;
    checkSnowTower(x+1);
  }
}

function resetFlake(flake) {
  flake.x = random(width);
  flake.y = 0;
  flake.v = random(0.5, 1);
}

function drawFlakes() {
  flakes.forEach(f => {
    point(f.x, f.y);
  });
}