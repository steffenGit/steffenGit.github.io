"use strict";

let g;
let p;
let osc;
function setup() {
  createCanvas(1200, 600);
  osc = new p5.Oscillator('sine');

  // let f = new Fretboard(12, osc);
  // console.log(f);
  // f.play(6, 0, 500)
  //     .then(() => f.play(6,1,500))
  //     .then(() => f.play(6,3,500))
  //     .then(() => f.play(6,5,500))
  //     .then(() => f.play(6,7,500))
  //     .then(() => f.play(6,8,500));

  console.log(new OctaveScale(SIMPLE('A'), MINOR_SCALE));
}

function draw() {
  background(221);


}