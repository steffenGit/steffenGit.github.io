"use strict";


const SIMPLE = (note) => NOTE[note]+60;

const NOTE = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11,
};

const NOTE_ORDER_SHARP = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

const CHROMATIC_SCALE = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
];

const MAJOR_SCALE = [
  0, 2, 4, 5, 7, 9, 11
];

const MAJOR_PENTATONIC_SCALE = [
  0, 2, 4, 5, 7, 9, 11
];

const MINOR_SCALE = [
  0, 2, 3, 5, 7, 8, 10
];

const MINOR_PENTATONIC_SCALE = [
  0, 2, 3, 5, 7, 8, 10
];


class OctaveScale {
  constructor(midi, mode) {
    this.notes = mode.map(n => new Note(midi+n));
  }
}

class Note {
  constructor(midi) {
    this.octave = floor(midi / 12);
    this.midi = midi;
    this.name = NOTE_ORDER_SHARP[midi % 12];
    this.freq = midiToFreq(midi);
  }

  play(duration, osc) {
    return new Promise((resolve, reject) => {
      console.log(this.midi);
      osc.freq(this.freq);
      osc.start();
      setTimeout(() => {
        osc.stop();
        resolve();
      }, duration);
    })
  }
}


