"use strict";

class Fretboard {
  constructor(length, osc) {
    this.strings = [];
    this.osc = osc;
    this.strings[1] = (new Gstring(length, 76, osc)); //high e
    this.strings[2] = (new Gstring(length, 71, osc));
    this.strings[3] = (new Gstring(length, 67, osc));
    this.strings[4] = (new Gstring(length, 62, osc));
    this.strings[5] = (new Gstring(length, 57, osc));
    this.strings[6] = (new Gstring(length, 52, osc)); // low E
  }

  play(string, fret, duration) {
    return this.strings[string].playFret(fret, duration, this.osc);
  }
}

class Gstring {
  constructor(length, midi, osc) {
    this.length = length;
    this.frets = [];
    this.osc = osc;
    for(let i = 0; i <= length; i++) {
      let m = midi + i;
      this.frets.push(new Note(m));
    }
  }

  playFret(fret, duration) {
    return this.frets[fret].play(duration, this.osc);
  }
}