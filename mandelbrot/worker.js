/**
 * Created by peleikis on 31.01.2017.
 */
"use strict";

(function () { // BEGIN iife

  let opts = {};
  let sharedArray = undefined;
  let id = undefined;

  self.addEventListener('message', function (event) {
    const {sharedBuffer} = event.data.buffer;
    sharedArray = new Int32Array(sharedBuffer); // (A)
    opts = event.data.opts;
    id = event.data.id;
    generateImage();


  });

  // Generate the fractal image
  function generateImage() {
    //console.time('image'+id);
    // Iterate over the pixels
    for (let y = 0; y < opts.imageh; y++) {
      for (let x = id; x < opts.imagew; x += opts.workers) {
        iterate(x, y, opts.maxiterations);
      }
    }
    //console.timeEnd('image'+id);
    self.postMessage(id);
  }

  // Calculate the color of a specific pixel
  function iterate(x, y, maxiterations) {
    // Convert the screen coordinate to a fractal coordinate
    let x0 = (x + opts.offsetx + opts.panx) / opts.zoom;
    let y0 = (y + opts.offsety + opts.pany) / opts.zoom;

    let iterations = singleIteration(x0, y0, maxiterations);


    // TODO write to buffer
    let i = x + y * opts.imagew;
    Atomics.store(sharedArray, i, iterations);


  }


  function singleIteration(x0, y0, maxiterations) {
    // Iteration letiables
    let a = 0;
    let b = 0;
    let rx = 0;
    let ry = 0;

    // Iterate
    let iterations = 0;
    while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
      rx = a * a - b * b + x0;
      ry = 2 * a * b + y0;

      // Next iteration
      a = rx;
      b = ry;
      iterations++;
    }
    return iterations;
  }


})(); // END iife
