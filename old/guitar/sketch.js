"use strict";

let g;
let p;

let mode = SCALES['MAJOR'];
let rootNote = 'C';
let scale;
function setup() {
  let canvas = createCanvas(1200, 600);
  canvas.parent('sketchholder');
  g = new Guitar(17);
  p = new Player(g, 120, 4, 4);

  // p.playScaleOnSingleString(scale, 6, 4);
  // p.playSingleNote(1, 4, 1);
  replot();
}

function draw() {

}

function replot() {
  g.stopPlotScale();
  scale = getScale(rootNote, mode);
  g.plotScale(scale);

  background(221);
  g.draw();

}

function changeRootNote(val) {
  rootNote = val;
  replot();

}

function changeMode(val) {
  mode = SCALES[val];
  replot();
}