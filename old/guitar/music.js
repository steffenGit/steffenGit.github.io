"use strict";

const NOTE_NAMES = [
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Ab',
  'A',
  'A#/Bb',
  'B',
];

const chromaticScale = (root, length) => {
  let l = length || 12;
  let offset = NOTE_NAMES.indexOf(root);
  let chromatic = [];
  for (let i = offset; i <= offset + l; i++) {
    chromatic.push(NOTE_NAMES[i % 12]);
  }
  return chromatic;
};

const I = {
  p1: 0,
  b2: 1,
  m2: 2,
  b3: 3,
  m3: 4,
  p4: 5,
  tritone: 6,
  p5: 7,
  b6: 8,
  m6: 9,
  b7: 10,
  m7: 11,
  octave: 0,
};

let SCALES = {};

SCALES.MAJOR = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: 2,
    func: 2,
  }, {
    position: 4,
    func: 3,
  }, {
    position: 5,
    func: 4,
  }, {
    position: 7,
    func: 5,
  }, {
    position: 9,
    func: 6,
  }, {
    position: 11,
    func: 7,
  }
];

SCALES.MINOR = [
  {
    position: 0,
    func: 1,
  }, {
    position: 2,
    func: 2,
  }, {
    position: 3,
    func: 3,
  }, {
    position: 5,
    func: 4,
  }, {
    position: 7,
    func: 5,
  }, {
    position: 8,
    func: 6,
  }, {
    position: 10,
    func: 7,
  }
];

SCALES.MAJOR_PENTATONIC = [
  {
    position: 0,
    func: 1,
  }, {
    position: 2,
    func: 2,
  }, {
    position: 4,
    func: 3,
  }, {
    position: 7,
    func: 5,
  }, {
    position: 9,
    func: 6,
  }
];
SCALES.MINOR_PENTATONIC = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.b3,
    func: 3,
  }, {
    position: I.p4,
    func: 4,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b7,
    func: 6,
  }
];

SCALES.MAJOR_CHORD = [
  {
    position: 0,
    func: 1,
  }, {
    position: 4,
    func: 3,
  }, {
    position: 7,
    func: 5,
  }
];


SCALES.MINOR_CHORD = [
  {
    position: 0,
    func: 1,
  }, {
    position: 5,
    func: 3,
  }, {
    position: 7,
    func: 5,
  }
];
SCALES.MAJOR_CHORD_7 = [
  {
    position: 0,
    func: 1,
  }, {
    position: 4,
    func: 3,
  }, {
    position: 7,
    func: 5,
  }, {
    position: 11,
    func: 7,
  }
];


SCALES.MINOR_CHORD_7 = [
  {
    position: 0,
    func: 1,
  }, {
    position: 5,
    func: 3,
  }, {
    position: 7,
    func: 5,
  }, {
    position: 10,
    func: 7,
  }
];
// https://guitarlessons365.com
// exotic scales for guitar
// 1 b2 4 5 b6
SCALES.JAPANESE = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.b2,
    func: 2,
  }, {
    position: I.p4,
    func: 4,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b6,
    func: 6,
  }
];

SCALES.HIRAJOSHI = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.m2,
    func: 2,
  }, {
    position: I.b3,
    func: 3,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b6,
    func: 6,
  }
];

SCALES.KUMOI = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.m2,
    func: 2,
  }, {
    position: I.b3,
    func: 3,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.m6,
    func: 6,
  }
];

SCALES.KOKIN_JOSHI = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.b2,
    func: 2,
  }, {
    position: I.p4,
    func: 4,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b7,
    func: 7,
  }
];

SCALES.IWATO = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.b2,
    func: 2,
  }, {
    position: I.p4,
    func: 4,
  }, {
    position: I.tritone,
    func: 5,
  }, {
    position: I.b7,
    func: 7,
  }
];



SCALES.ORIENTAL = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.b2,
    func: 2,
  }, {
    position: I.m3,
    func: 3,
  }, {
    position: I.p4,
    func: 4,
  }, {
    position: I.tritone,
    func: 5,
  }, {
    position: I.m6,
    func: 6,
  }, {
    position: I.b7,
    func: 7,
  }
];



SCALES.PELOG = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.b2,
    func: 2,
  }, {
    position: I.b3,
    func: 3,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b6,
    func: 6,
  }
];



SCALES.EGYPTIAN = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.m2,
    func: 2,
  }, {
    position: I.p4,
    func: 4,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b7,
    func: 7,
  }
];


SCALES.CHINESE = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.m3,
    func: 3,
  }, {
    position: I.tritone,
    func: 4,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.m7,
    func: 7,
  }
];

SCALES.HUNGARIAN_GYPSY_MINOR = [
  {
    position: I.p1,
    func: 1,
  }, {
    position: I.m2,
    func: 2,
  }, {
    position: I.b3,
    func: 3,
  }, {
    position: I.tritone,
    func: 4,
  }, {
    position: I.p5,
    func: 5,
  }, {
    position: I.b6,
    func: 6,
  }, {
    position: I.b7,
    func: 7,
  }
];


const getScale = (root, mode) => mode.map(i => {
  i.note = chromaticScale(root)[i.position];
  return i;

});