"use strict";

let fireworks = [];
let shrapnels = [];
let skyline = [];
let g;

const MIN_WIDTH = 50;
const MAX_WIDTH = 130;
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 350;

const INTERVAL = 0.01;

let bgData;
let bgImg;
function setup() {
  createCanvas(1200, 800);
  g = createVector(0, .2);
  initSkyline(25);
  initBackground();
}


function draw() {
  drawBackground();
  if (fireworks.length < 10 && random() > 0.03) fireworks.push(new Firework());

  fireworks.forEach((f, i) => {
    f.update();
    if (f.v.y > 0) {
      fireworks.splice(i, 1);
      explode(f);
      return;
    }
    f.applyForce(g);

    f.draw();
  });

  shrapnels.forEach((p, i) => {
    if (!p.update()) {
      shrapnels.splice(i, 1);
      return;
    }
    p.applyForce(g);
    p.draw();
  });
  drawSkyline();

}


function explode(f) {
  for (let i = 0; i < 20; i++) {
    shrapnels.push(new Shrapnel(f));
  }
}

function initSkyline(no) {
  for (let i = 0; i < no; i++) {
    let x = random(width);
    let w = random(MIN_WIDTH, MAX_WIDTH);
    let h = random(MIN_HEIGHT, MAX_HEIGHT);
    skyline.push({
      x: x,
      width: w,
      height: h,
    });
  }
}

function drawSkyline() {
  skyline.forEach(s => {
    noStroke();
    fill(0);
    rect(s.x, height - s.height, s.width, height);
  })
}

function initBackground() {
  bgImg = createImage(width, height);
  bgData = createImage(width, height);
  bgData.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      bgData.set(x, y, color(noise(x*INTERVAL, y*INTERVAL)*255));
      bgImg.set(x, y, color(2, 2, 35));
    }
  }
  bgData.updatePixels();

}

function drawBackground() {
  image(bgData, 0, 0);
}

