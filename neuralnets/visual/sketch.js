"use strict";
let nn;
let runner;

function setup() {
  xor();
}

function xor() {

  console.log("setting up");
  nn = new NN(.1);
  nn.addLayer(2, 'input')
      .addLayer(3, 'hidden')
      .addLayer(4, 'hidden')
      .addLayer(2, 'output');
  console.log(nn);

  runner = new NnRunner(nn);

  let data = [];

  for (let i = 0; i < 100; i++) {
    let a = Math.floor(Math.random() * 2);
    let b = Math.floor(Math.random() * 2);
    let c = [1, 0];
    if ((a || b) && !(a && b)) {
      c = [0, 1];
    }
    data.push({input: [a, b], target: c});

  }
  console.log(data);
  console.log('done loading');
  runner.setTraningDataset(data);
  runner.run(100000, 10000);

}


function draw() {


}