"use strict";

const COLORS = [
  'steelblue',
  'lightcoral',
  'khaki',
  'lightskyblue',
  'mediumturquoise',
  'powderblue',
  'darksalmon',
  'lavender',

];

let attackLevel = 1.0;
let releaseLevel = 0;

let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;


class GuitarString {
  constructor(tuning, basenote, frets, padding, weight) {
    this.frets = frets || 20;
    this.tuning = tuning;
    this.basenote = basenote;
    this.notes = chromaticScale(tuning, frets);
    this.padding = padding;
    this.weight = weight;

    this.started = false;
    this.currentFret = 0;

    this.osc = new p5.Oscillator('triangle');
    this.env = new p5.Env();
    this.env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    this.env.setRange(attackLevel, releaseLevel);

    this.osc.amp(this.env);
    this.osc.start();
    this.currentScale = undefined;
    this.drawingScale = false;
  }

  play(fret, duration) {
    if(this.started) return;
    return new Promise((resolve, reject) => {
      this.started = true;
      this.currentFret = fret;
      let note = fret + this.basenote;
      this.osc.freq(midiToFreq(note));
      this.env.play();
      //this.osc.start();
      // console.log('playing ' + this.getNoteName(fret) + ' for ms ' + duration);
      setTimeout(() => {
        this.stop();
        resolve();
      }, duration);
    });
  }

  stop() {
    this.started = false;
    this.currentFret = 0;
    //this.osc.stop();

  }

  getNoteName(fret) {
    return this.notes[fret];
  }


  getNotes() {
    return this.notes;
  }

  draw() {
    this.drawString();
    if (this.drawingScale) {
      this.drawCurrentScale();
    }
    if (this.started) {

      this.drawCurrentNote();
    }
  }

  drawString() {
    strokeWeight(this.weight);
    stroke('silver');
    line(100, this.padding, this.frets * 50 + 100, this.padding);

    textAlign(CENTER, CENTER);
    noStroke();
    textStyle(BOLD);
    textSize(14);

    text(this.tuning, 50, this.padding);
  }

  drawCurrentNote() {
    let x = this.currentFret * 50 + 75;
    let r = 20;
    let n = this.getNoteName(this.currentFret);
    stroke('black');
    strokeWeight(1);
    fill('lightgreen');
    ellipse(x, this.padding, r, r);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    noStroke();
    textSize(12);
    fill('black');
    text(n, x, this.padding);
  }

  drawCurrentScale() {
    //console.log(this.notes);
    for (let i = 0; i <= this.frets; i++) {
      let j = -1;
      this.currentScale.forEach((n, index) => {
        if (n.note === this.notes[i])
          j = index;
      });
      if (j > -1) {
        let x = i * 50 + 75;
        let r = 20;
        let n = this.currentScale[j].func;
        strokeWeight(1);
        stroke('black');
        fill(COLORS[n]);
        ellipse(x, this.padding, r, r);
        textStyle(NORMAL);
        textAlign(CENTER, CENTER);
        noStroke();
        fill('black');
        text(n, x, this.padding);
        addListener(
            new Listener(createVector(x - 10, this.padding - 10),
                createVector(x + 10, this.padding + 10),
                (a1, a2) => this.play(a1, a2), i, 500)
        );
      }
    }
  }

  plotScale(scale) {
    this.drawingScale = true;
    this.currentScale = scale
  }

  stopPlotScale() {
    this.drawingScale = false;
  }


}