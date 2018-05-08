"use strict";
let nn;
let runner;

function setup() {
  createCanvas(1000, 700);
  let res = xor();
  let points = [];
  res.forEach((c, i) => {
    // if(c < 2)
      points.push(new GPoint(i, c));
  });
  let plot = new GPlot(this);
  plot.setDim(800, 500);
  // Set the plot title and the axis labels
  plot.setPoints(points);
  plot.getXAxis().setAxisLabelText("iterations");
  plot.getYAxis().setAxisLabelText("error rate");
  plot.setTitleText("XOR");

  // Draw it!
  plot.defaultDraw();
  console.log(res);
  noLoop();

}

function xor() {

  console.log("setting up");
  nn = new NN(.1);
  nn.addLayer(2, 'input')
      .addLayer(5, 'hidden')
      .addLayer(4, 'hidden')
      .addLayer(2, 'output');
  console.log(nn);

  runner = new NnRunner(nn);

  let data = [];
  let pool = [1, 0];
  for (let i = 0; i < 10000; i++) {
    let a = random(pool);
    let b = random(pool);
    let c = [1, 0];
    if ((a || b) && !(a && b)) {
      c = [0, 1];
    }
    data.push({input: [a, b], target: c});

  }
  console.log(data);
  console.log('done loading');
  runner.setTraningDataset(data);
  return runner.run(1, 1);

}


function draw() {


}