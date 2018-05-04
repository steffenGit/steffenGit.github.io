"use strict";

function setup() {

  console.log("setting up");
  let nn = new NN();
  nn.addLayer(3, 'input')
      .addLayer(4, 'hidden')
      .addLayer(3, 'hidden')
      .addLayer(2, 'output');
  console.log(nn);
  console.log(nn.reducePredict([3,1,2]));
}


function draw() {


}