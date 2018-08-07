"use strict";

// dimensions of the canvas
const WIDTH = 1900;
const HEIGHT = 800;
const MID = HEIGHT / 2;

// display
let SCALE;
const SPEED = 40;

// orientation of the halfCircle
const UP = true;
const DOWN = false;
let currentOrientation = UP;

// colors for the halfCircle
const RED = true;
const GREEN = false;
let currentColorSet = RED;
let currentColor = 'red';

let currentNumber = 0;
let currentHop = 1;

let halfCircles = [];
let numbersTaken = [];

// for the animation only
let interval;
let started = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noFill();
  reset();
  initAudio();
}

function draw() {
  background(215);
  //drawCenterLine();
  drawHalfCircles();
}

function reset() {
  SCALE = 30;
  currentHop = 1;
  currentNumber = 0;
  currentColorSet = RED;

  halfCircles = [];
  numbersTaken = [];
}

function drawCenterLine() {
  stroke('black');
  line(0, MID, WIDTH, MID);
  drawHalfCircles();
}

function drawHalfCircles() {
  halfCircles.forEach(h => h.draw());
}

// swap from UP to DOWN
function swapOrientation() {

  currentOrientation = !currentOrientation;

  // when swapped to UP, swap the color as well
  if (currentOrientation)
    swapColor();
}

function swapColor() {
  // swap this silly color boolean
  currentColorSet = !currentColorSet;

  // set the color string accordingly
  if (currentColorSet)
    currentColor = 'red';
  else
    currentColor = 'green';
}

function calcNext() {

  // temp of the currentvalue
  let n = currentNumber;

  // to be calculated
  let r;
  let x;

  // rule: if current position - hop is already taken: position + hop
  // position - hop otherwise
  if (n - currentHop <= 0 || numbersTaken[n - currentHop]) {
    currentNumber += currentHop;
    r = currentNumber - n;
    x = abs(n + r / 2);
  } else {
    currentNumber -= currentHop;
    r = n - currentNumber;
    x = abs(n - r / 2);
  }

  // constrct new halfcircle for drawing
  let halfCircle = new HalfCircle(x, r, currentOrientation, currentColor);
  halfCircles.push(halfCircle);

  // mark the position as already taken
  numbersTaken[currentNumber] = true;


  // play audio

  playNumber(currentNumber);
  // if the position lies outside of the screen, stop calculationg new ones.
  if ((x + r) * SCALE > WIDTH)
    updateScale(x + r);
  //prepare next hop
  currentHop++;
  // swap the orientation of the half circle
  swapOrientation();
}

function updateScale(newMax) {
  SCALE = WIDTH / newMax;
}

function start(speed) {
  if (started)
    return;
  interval = setInterval(() => calcNext(), speed || SPEED);
  started = true;
}

function stop() {
  clearInterval(interval);
  started = false;
}


class HalfCircle {
  constructor(centerX, radius, orientation, color) {
    this.x = centerX;
    this.r = radius;
    this.o = orientation;
    this.c = color;
  }

  draw() {
    stroke(this.c);
    if (this.o) {
      arc(this.x * SCALE, MID, this.r * SCALE, this.r * SCALE, 0, PI);
    } else {
      arc(this.x * SCALE, MID, this.r * SCALE, this.r * SCALE, PI, 0);
    }
  }
}





