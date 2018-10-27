"use strict";
let painter;
let runner;
let nn = new NN(0.05);


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
    plot.getYAxis().setAxisLabelText("mean error");
    plot.setTitleText("2 XOR and one dead input");
    plot.defaultDraw();
    //sketch.noLoop();
    runner = new NnRunner(nn);
  };

  // sketch.draw = function () {
  //   //sketch.background(122);
  //   let res = xor(50);
  //   //console.log(res);
  //   res.forEach((c, i) => {
  //     // if(c < 2)
  //     points.push(new GPoint(ct++, c));
  //   });
  //   plot.setPoints(points);
  //   plot.defaultDraw();
  // };


  sketch.draw = function () {
    let its = 50;
    let xorData = xor(its);

    runner.setTraningDataset(xorData);
    let res = runner.run(its, 10);

    let res2 = res.filter((e) => e > 0.5);
    points.push(new GPoint(ct++, 100*res2.length/res.length));

    plot.setPoints(points);
    plot.defaultDraw();

    if(ct > 500) {
      myp5.noLoop();
      myp5_error.noLoop();
    }
  }
};

function xor(size) {

  let data = [];
  for (let i = 0; i < size; i++) {
    let a = Math.floor(Math.random()*1.9);
    let b = Math.floor(Math.random()*1.9);
    let c = [0,1];
    if ((a || b) && !(a && b)) {
      c = [1,0];
    }
    data.push({input: [a, b], target: c});

  }
  //console.log(data);
  //console.log('done loading');
  return data;
}


function sumTest(size) {
  let data = [];
  for (let i = 0; i < size; i++) {
    let a = Math.floor(Math.random()*1.9);
    let b = Math.floor(Math.random()*1.9);

    let c = [0, 0];
    let sum = a+b-1;
    c[sum] = 1;
    data.push({input: [a, b], target: c});

  }
  //console.log(data);
  //console.log('done loading');
  return data;
}


nn.addLayer(2, 'input')
    //.addLayer(6, 'hidden')
    .addLayer(5, 'hidden')
    .addLayer(4, 'hidden')
    .addLayer(2, 'output');
console.log(nn);

let myp5 = new p5(sketchNn);
let myp5_error = new p5(sketchError);
