"use strict;"
import {Map} from './lib/Map.js';
import {Scene} from'./lib/Scene.js';
import {Camera} from './lib/Camera.js';
import {MapRenderer} from './lib/MapRenderer.js'
import {FpRenderer} from './lib/FpRenderer.js'
import {SvgRenderer} from './lib/SvgRenderer.js'
import {FaceRenderer} from './lib/FaceRenderer.js'
import {TextureRenderer} from './lib/TextureRenderer.js'

console.log('script loaded');

const mapCtx = document.getElementById("mapCanvas").getContext("2d");

const faceCtx = document.getElementById("faceCanvas").getContext("2d");

const svgCtx = document.getElementById("svgCanvas").getContext("2d");

let m = new Map(20, 15, 32, 32);

m.load([
  1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 5, 5, 1, 1, 3, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 1,
  1, 0, 0, 0, 0, 2, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 4, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 3,
  1, 0, 0, 0, 0, 0, 0, 4, 0, 5, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 3,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 3,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 5, 0, 3,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 5, 0, 3,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 3,
  1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3, 1, 1]);

let c = new Camera(12.2, 7.4, 0.0, Math.PI / 3, m);
let s = new Scene(m, c);

let mapr = new MapRenderer(s, mapCtx);
let svgr = new SvgRenderer(s, svgCtx, 640, 480);
let fr = new TextureRenderer(s, faceCtx, 640, 480);
let gCount = 0;
let rCount = 0;


let gameLoop = setInterval(function () {
  s.update();
  mapr.render();  
  gCount++;
}, 17)


let renderLoop = setInterval(function () {
  fr.render();
  //svgr.render();
  rCount++;
}, 17)


setInterval(function() {
  console.log(gCount, rCount);
  rCount = 0;
  gCount = 0;
}, 1000)


document.addEventListener('keydown', (event) => {
  const keyName = event.key;


  switch(keyName) {
    case 'w':
    case 'ArrowUp':
      c.speed = c.maxSpeed;
      break;
    case 'a':
    case 'ArrowLeft':
      c.rot = -c.maxRot;
      break;
    case 's':
    case 'ArrowDown':
      c.speed = -c.maxSpeed;
      break;
    case 'd':
    case 'ArrowRight':
      c.rot = c.maxRot;
      break;  
  }
  event.preventDefault();


}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  switch(keyName) {
    case 'w':
    case 'ArrowUp':
      c.speed = 0;
      break;
    case 'a':
    case 'ArrowLeft':
      c.rot = 0;
      break;
    case 's':
    case 'ArrowDown':
      c.speed = 0;
      break;
    case 'd':
    case 'ArrowRight':
      c.rot = 0;
      break;  
  }
  event.preventDefault();

}, false);





