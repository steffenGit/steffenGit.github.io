"use strict";

class Guitar {
  constructor(frets) {
    let s = [];
    s[1] = new GuitarString('E', 76, frets, 20, 1);
    s[2] = new GuitarString('B', 71, frets, 40, 2);
    s[3] = new GuitarString('G', 67, frets, 60, 2);
    s[4] = new GuitarString('D', 62, frets, 80, 3);
    s[5] = new GuitarString('A', 57, frets, 100, 4);
    s[6] = new GuitarString('E', 52, frets, 120, 5);
    this.frets = frets;
    this.strings = s;
  }

  getString(string) {
    return this.strings[string];
  }

  draw() {
    for (let i = 0; i <= this.frets; i++) {
      strokeWeight(4);
      stroke('grey');
      line(i * 50 + 100, 0, i * 50 + 100, 140);
      textAlign(CENTER, CENTER);
      noStroke();
      textStyle(NORMAL);
      textSize(14);
      if(i === 5 || i === 7 || i === 12 || i === 17) {
        textStyle(BOLD);
      }
      text(i, i * 50 + 85, 150);
    }
    this.strings.forEach(s => s.draw());

    textAlign(CENTER, CENTER);
    noStroke();
    textStyle(BOLD);
    textSize(20);
    fill('black');
    text(this.scaleString, 400, 200);
  }

  plotScale(scale) {
    console.log(scale);
    this.scaleString = scale.map(n => n.note).join(' - ');
    this.strings.forEach(s => s.plotScale(scale));

  }

  stopPlotScale() {
    this.strings.forEach(s => s.stopPlotScale());
  }
}

