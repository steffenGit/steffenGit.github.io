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
function setup() {
  createCanvas(600, 800);
  g = createVector(0, .2);
  initSkyline(18);
  initBackground();
}


function draw() {
  drawBackground();
  if (fireworks.length < 1 && random() > 0.03) fireworks.push(new Firework());

  fireworks.forEach((f, i) => {
    f.update();
    if (f.v.y > 0) {
      fireworks.splice(i, 1);
      explode(f);
      explodeVis3(f);
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
  bgData = createImage(width, height);
  bgData.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      bgData.set(x, y, color(noise(x*INTERVAL, y*INTERVAL)*255, 255));
    }
  }
  bgData.updatePixels();
  bgData.loadPixels();


}

function drawBackground() {
  background(2,2,30);
  noTint();
  //image(bgData, 0, 0);
}

function explodeVisual(f) {
  noStroke();
  fill(f.c);
  ellipse(f.pos.x,f.pos.y, random(80));
}

function explodeVis2(f) {
  let r = 300;

  let x = Math.floor(f.pos.x-r/2);
  let y = Math.floor(f.pos.y-r/2);
  f.c.setAlpha(20);
  tint(f.c);
  blend(bgData, x, y, r, r, x, y, r, r, HARD_LIGHT);

}

function explodeVis3(f) {
  let r = 300;

  let x = Math.floor(f.pos.x-r/2);
  let y = Math.floor(f.pos.y-r/2);
  //f.c.setAlpha(20);
  loadPixels();
  for (let _y = y; _y < y+r; _y++) {
    for (let _x = x; _x < x+r; _x++) {
      let p = createVector(_x, _y);
      let d = p5.Vector.dist(f.pos, p);
      let dnorm = min(map(d,0, r/2, 0, 1), 1);

      let i = (_x + _y * width)*4;
      //let ca = get(x, y);
      pixels[i+0] = Math.abs(lerp(bgData.pixels[i+0], pixels[i+0], dnorm));
      pixels[i+1] = Math.abs(lerp(bgData.pixels[i+1], pixels[i+1], dnorm));
      pixels[i+2] = Math.abs(lerp(bgData.pixels[i+2], pixels[i+2], dnorm));

      // pixels[i+0] = Math.abs(lerp(bgData.pixels[i+0], pixels[i+0], dnorm));
      // pixels[i+1] = Math.abs(lerp(bgData.pixels[i+1], pixels[i+1], dnorm));
      // pixels[i+2] = Math.abs(lerp(bgData.pixels[i+2], pixels[i+2], dnorm));

      pixels[i+3] = 255;
    }
  }
  updatePixels();
  tint(f.c);
}

