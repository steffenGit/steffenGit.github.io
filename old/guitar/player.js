"use strict";

class Player {
  constructor(guitar, bpm, beats, noteValue) {
    this.g = guitar;
    this.bpm = bpm;
    this.beats = beats;
    this.noteValue = noteValue;
    let beatsPerS = this.bpm / 60;
    let beatLengthInMs = (1 / beatsPerS) * 1000;
    console.log(beatLengthInMs);
    this.fullNoteLength = beatLengthInMs * noteValue;
  }


  playSingleNote(string, fret, value) {
    return this.g.getString(string).play(fret, this.fullNoteLength / value);
  }


  async playScaleOnSingleString(scale, string, value) {

    let str = this.g.getString(string);
    let notes = str.getNotes();

    let rootIndex = notes.indexOf(scale[0].note);

    this.g.plotScale(scale);
    for (let i = rootIndex; i < notes.length; i++) {

      let j = -1;
      scale.forEach((n, index) => {
        if(n.note === notes[i])
          j = index;
      });
      if(j > -1) {
        await str.play(j, this.fullNoteLength / value);
      }
    }
    // this.g.stopPlotScale();

  }


}