"use strict";


function* fn(){
  let n0 = 0;
  let n1 = 1;

  while(true) {

  }
}

function* fibonacci() {
  var fn1 = 0;
  var fn2 = 1;
  while (true) {
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    if (reset) {
      fn1 = 0;
      fn2 = 1;
    }
  }
}

let c = 0;
let seq = fibonacci();
console.log(seq.next());