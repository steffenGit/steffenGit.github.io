/**
 * Created by peleikis on 31.01.2017.
 */
"use strict";

(function () { // BEGIN iife
  if (typeof SharedArrayBuffer !== 'function' || typeof Atomics !== 'object') {
    document.getElementById('output').textContent = 'This browser does not support SharedArrayBuffers!';
    return;
  }

  // mandelbrot-ww-fractal.js

  const worker = new Worker('worker.js');

  // To be shared
  const sharedBuffer = new SharedArrayBuffer( // (A)
    10 * Int32Array.BYTES_PER_ELEMENT); // 10 elements


  // Local only
  const sharedArray = new Int32Array(sharedBuffer); // (B)


  Lock.initialize(sharedArray, 0);
  const lock = new Lock(sharedArray, 0);

  lock.lock();
  console.log('locked');
  worker.postMessage({sharedBuffer}); // clone

  setTimeout(function () {
    lock.unlock();
    console.log('unlocked');
    lock.lock();
    console.log('got lock');
    //lock.unlock();


  }, 1500);


})(); // END iife