"use strict;"
import {Map} from './lib/Map.js';
import {Scene} from'./lib/Scene.js';
import {Camera} from './lib/Camera.js';
import {MapRenderer} from './lib/MapRenderer.js'
import {FpRenderer} from './lib/FpRenderer.js'

console.log('script loaded');

const mapC = document.getElementById("mapCanvas");
const mapCtx = mapC.getContext("2d");

const fpC = document.getElementById("fpCanvas");
const fpCtx = fpC.getContext("2d");

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

let mr = new MapRenderer(s, mapCtx);
let fpr = new FpRenderer(s, fpCtx, 640, 480);

let l = setInterval(function () {
  s.update();
  mr.render();
  fpr.render();
}, 28)





