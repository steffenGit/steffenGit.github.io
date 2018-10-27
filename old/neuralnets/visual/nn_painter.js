"use strict";

class NnPainter {

  constructor(sketch, nn) {
    this.nn = nn;
    this.s = sketch;
    this.padX = Math.floor(this.s.width/(this.nn.layers.length + 1));
    console.log(this.s.width, this.padX);
    this.setupNodes();

  }

  update() {
    this.padX = Math.floor(this.s.width/(this.nn.layers.length + 1));
    this.setupNodes();
  }

  setupNodes() {
    this.nodes = [];
    this.nn.layers.forEach((l, i) => {
      let layer = [];
      let x = i * this.padX + this.padX;
      let padY = this.s.height / (l.size + 1);
      for (let j = 0; j < l.size; j++) {
        let y = j * padY + padY;
        let bias = l.biases.toArray()[j];
        layer.push({
          x: x,
          y: y,
          bias: bias,
          weights: l.weights ? l.weights.data[j] : null
        });
      }
      this.nodes.push(layer);
    });
  }

  draw() {
    this.s.background(51);

    this.drawEdges(2);
    this.drawNodes(20);

  }

  drawEdges(rad) {
    for (let i = 1; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes[i].length; j++) {
        for (let k = 0; k < this.nodes[i - 1].length; k++) {
          let val = this.nodes[i][j].weights[k] * 255;
          // if(val>255 || val < -255) console.log('whooot ' + val);
          if (Math.sign(val) > 0) {
            this.s.stroke(80, Math.abs(val), 80, Math.abs(val));
          } else {
            this.s.stroke(Math.abs(val), 80, 80, Math.abs(val));
          }
          this.s.strokeWeight(2);
          this.s.line(this.nodes[i][j].x, this.nodes[i][j].y, this.nodes[i - 1][k].x, this.nodes[i - 1][k].y);
        }
      }
    }
  }

  drawNodes(rad) {
    this.nodes.forEach((l, i) => {
      l.forEach((l, i) => {
        this.s.stroke(Math.abs(l.bias * 255));
        this.s.strokeWeight(2);
        if (l.bias > 0) {
          this.s.fill(20, Math.abs(l.bias * 255), 20, Math.abs(l.bias * 255));
        } else {
          this.s.fill(Math.abs(l.bias * 255), 20, 20, Math.abs(l.bias * 255));
        }

        this.s.ellipse(l.x, l.y, rad);

      });
    });
  }

}


if (typeof module !== 'undefined') {
  module.exports = NnPainter;
}