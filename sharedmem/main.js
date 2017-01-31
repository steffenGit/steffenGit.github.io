/**
 * Created by peleikis on 31.01.2017.
 */
"use strict";

(function () { // BEGIN iife
  if (typeof SharedArrayBuffer !== 'function' || typeof Atomics !== 'object') {
    document.getElementById('output').textContent = 'This browser does not support SharedArrayBuffers!';
    return;
  }



  const worker = new Worker('worker.js');

})(); // END iife