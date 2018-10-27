"use strict";

const WIDTH = 1000;
const HEIGHT = 600;

const CELL_SIZE = 32;
const W = Math.floor(WIDTH / CELL_SIZE);
const H = Math.floor(HEIGHT / CELL_SIZE);
let grid = undefined;

let animals = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);

  grid = new World(W, H, CELL_SIZE);
  createAnimals(10);
  console.log(grid);
}

let counter = 0;

function draw() {
  counter++;
  background(51);
  grid.draw();

  animals.forEach(a => {
    a.draw();
    if(counter%5 === 0) a.update();
  });


}

function createAnimals(number) {
  for(let i = 0; i < number; i++) {
    let x = Math.floor(Math.random()*(W-1));
    let y = Math.floor(Math.random()*(H-1));
    console.log(x,y);
    let a = new Animal(x, y, grid, CELL_SIZE);
    animals.push(a);
  }
}

function stop() {
  noLoop();
}

function go() {
  loop();
}
