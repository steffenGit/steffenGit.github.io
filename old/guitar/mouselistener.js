"use strict";

let listeners = [];

function mouseClicked() {
  console.log('clicked');
  listeners.forEach(l => {
    if(l.contains(mouseX, mouseY))
      l.call();
  });


  // prevent default
  return false;
}

function clearListeners() {
  listeners = [];
}

function addListener(listener) {
  console.log('added');
  listeners.push(listener);
}

class Listener {
  constructor(tlVec, brVec, cb, arg1, arg2) {
    this.tlVec = tlVec;
    this.brVec = brVec;
    this.cb = cb;
    this.arg1 = arg1;
    this.arg2 = arg2;

  }

  contains(x, y) {
    console.log(x, y);
    console.log(this.tlVec);
    console.log(this.brVec);
    return (x >= this.tlVec.x && x <= this.brVec.x) && (y >= this.tlVec.y && y <= this.brVec.y);
  }

  call() {
    console.log('calling ');
    this.cb(this.arg1, this.arg2);
  }
}
