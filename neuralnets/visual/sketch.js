"use strict";
let nn;
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

  for(let i = 0; i < 20000; i++) {
    let a = Math.floor(Math.random()  * 1.9);
    let b = Math.floor(Math.random()  * 1.9);
    let c = [1, 0];
    if((a || b) && !(a && b)) {
      c = [0, 1];
    }
    nn.train([a,b], c).toArray()[0];
    if ( i % 100000 === 0) {
      //nn.feedForward([a, b]);
      //console.log(c);
    }
  }
  console.log('done');

}


function draw() {


}