"use strict";

const C_SMALL = {
  c: 130.8128,
  d: 146.8324,
  e: 164.8138,
  f: 174.6141,
  g: 195.9977,
  a: 220.0000,
  b: 246.9417,
};

const C_CONTRA = {
  1: 32.70320,
  2: 36.70810,
  3: 41.20344,
  4: 43.65353,
  5: 48.99943,
  6: 55.00000,
  7: 61.73541,

};


function playNumber(number, length) {

  let note = number%7 + 1;
  let octave = floor(number/7);
  playNote(note, octave, length);
}


function playNote(note, octave, length) {
  let l = length || 350;
  let f = C_CONTRA[note]*2**(octave%6+1);
  startPlay(f, l);
}