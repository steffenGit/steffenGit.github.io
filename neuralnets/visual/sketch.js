"use strict";
let painter;
let runner;
let nn = new NN(0.1);


let sketchNn = function (sketch) {

  const WIDTH = 1000;
  const HEIGHT = 600;

  let padX;

  sketch.setup = function () {
    sketch.createCanvas(WIDTH, HEIGHT);
    painter = new NnPainter(sketch, nn);
    //sketch.noLoop();
  };

  sketch.draw = function () {
    painter.update();
    painter.draw();
  };
};



let points = [];
let ct = 0;
let sketchError = function(sketch) {
  const WIDTH = 800;
  const HEIGHT = 600;
  let plot;

  sketch.setup = function () {
    sketch.createCanvas(WIDTH, HEIGHT);
    plot = new GPlot(sketch);
    plot.setDim(WIDTH-100, HEIGHT-100);
    plot.getXAxis().setAxisLabelText("iterations x 100");
    plot.getYAxis().setAxisLabelText("error rate");
    plot.setTitleText("XOR");
    plot.defaultDraw();
    //sketch.noLoop();
    runner = new NnRunner(nn);
  };

  sketch.draw = function () {
    //sketch.background(122);
    let res = xor(100);
    //console.log(res);
    res.forEach((c, i) => {
      // if(c < 2)
      points.push(new GPoint(ct++, c));
    });
    plot.setPoints(points);
    plot.defaultDraw();
  };
};

function xor(iterations) {

  let data = [];
  for (let i = 0; i < iterations; i++) {
    let a = Math.floor(Math.random()*1.9);
    let b = Math.floor(Math.random()*1.9);
    let c = [1, 0];
    if ((a || b) && !(a && b)) {
      c = [0, 1];
    }
    data.push({input: [a, b], target: c});

  }
  //console.log(data);
  //console.log('done loading');
  runner.setTraningDataset(data);
  return runner.run(iterations, 90);

}


nn.addLayer(2, 'input')
    .addLayer(5, 'hidden')
    .addLayer(6, 'hidden')
    .addLayer(3, 'hidden')
    .addLayer(2, 'output');
console.log(nn);

let myp5 = new p5(sketchNn);
let myp5_error = new p5(sketchError);
