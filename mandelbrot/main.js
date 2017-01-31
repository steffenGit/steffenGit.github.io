/**
 * Created by peleikis on 31.01.2017.
 */
"use strict";

// ------------------------------------------------------------------------
// Drawing Mandelbrot Fractals With HTML5 Canvas And JavaScript
// (c) 2015 Rembound.com
// http://rembound.com/articles/drawing-mandelbrot-fractals-with-html5-canvas-and-javascript
// ------------------------------------------------------------------------

// The function gets called when the window is fully loaded
window.onload = function () {
  // Get the canvas and context
  const canvas = document.getElementById("viewport");
  const context = canvas.getContext("2d");

  // Width and height of the image
  const imagew = canvas.width;
  const imageh = canvas.height;

  const maxWorkers = 8;
  const workers = [maxWorkers];

  if (imagew % maxWorkers !== 0) {
    throw new Error('image width must be a multiple of '+ maxWorkers);
  }

  // Image Data (RGBA)
  let imagedata = context.createImageData(imagew, imageh);


  const sharedBuffer = new SharedArrayBuffer( // (A)
    imagew * imageh * Int32Array.BYTES_PER_ELEMENT); // 10 elements


  // Local only
  const sharedArray = new Int32Array(sharedBuffer); // (B)

  // Pan and zoom parameters
  let offsetx = -imagew / 2;
  let offsety = -imageh / 2;
  // let panx = -100;
  // let pany = 0;
  // let zoom = 150;

  let panx = -271718;
  let pany = -484;
  let zoom = 153600;

  // Palette array of 256 colors
  let palette = [];

  // The maximum number of iterations per pixel
  let maxiterations = 250;

  let done = 0;

  // Initialize the game
  function init() {
    // Add mouse events
    canvas.addEventListener("mousedown", onMouseDown);

    createWorkers();

    // Generate palette
    generatePalette();


    // Generate image
    generateImage();

    // Enter main loop
    main(0);
  }

  function createWorkers() {
    for (let i = 0; i < maxWorkers; i++) {
      workers[i] = new Worker('worker.js');
      workers[i].addEventListener('message', paintOnMessage);
    }
  }


  // Main loop
  function main(tframe) {
    // Request animation frames
    window.requestAnimationFrame(main);

    // Draw the generate image
    context.putImageData(imagedata, 0, 0);
  }

  // Generate palette
  function generatePalette() {
    // Calculate a gradient
    let roffset = 24;
    let goffset = 16;
    let boffset = 0;
    for (let i = 0; i < 256; i++) {
      palette[i] = {r : roffset, g : goffset, b : boffset};

      if (i < 64) {
        roffset += 3;
      } else if (i < 128) {
        goffset += 3;
      } else if (i < 192) {
        boffset += 3;
      }
    }
  }

  function generateImage() {

    console.time('all');
    let opts = {
      imageh        : imageh,
      imagew        : imagew,
      id            : 0,
      offsetx       : offsetx,
      offsety       : offsety,
      panx          : panx,
      pany          : pany,
      zoom          : zoom,
      maxiterations : maxiterations,
      workers       : maxWorkers
    };

    for (let i = 0; i < maxWorkers; i++) {
      workers[i].postMessage({
        buffer : {sharedBuffer},
        id     : i,
        opts   : opts
      });
    }

  }

  function setColor(x, y) {


    let i = x + y * imagew;
    // console.log(i, ' : ', x, y);
    let iterations = Atomics.load(sharedArray, i);
    //console.log(iterations);
    // Get palette color based on the number of iterations
    let color;
    if (iterations == maxiterations) {
      color = {r : 0, g : 0, b : 0}; // Black
    } else {
      let index = Math.floor((iterations / (maxiterations - 1)) * 255);
      color = palette[index];
    }

    // Apply the color
    let pixelindex = (y * imagew + x) * 4;
    imagedata.data[pixelindex] = color.r;
    imagedata.data[pixelindex + 1] = color.g;
    imagedata.data[pixelindex + 2] = color.b;
    imagedata.data[pixelindex + 3] = 255;
  }


  function paintOnMessage(event) {
    console.log(done);
    done++;
    if (done === maxWorkers) {
      done = 0;
      for (let y = 0; y < imageh; y++) {
        for (let x = 0; x < imagew; x++) {
          setColor(x, y);
        }
      }
      console.timeEnd('all');
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////

  // Zoom the fractal
  function zoomFractal(x, y, factor, zoomin) {
    if (zoomin) {
      // Zoom in
      zoom *= factor;
      panx = factor * (x + offsetx + panx);
      pany = factor * (y + offsety + pany);
    } else {
      // Zoom out
      zoom /= factor;
      panx = (x + offsetx + panx) / factor;
      pany = (y + offsety + pany) / factor;
    }

    console.log('zoom', zoom, 'panx', panx, 'pany', pany);
  }

  // Mouse event handlers
  function onMouseDown(e) {
    let pos = getMousePos(canvas, e);

    // Zoom out with Control
    let zoomin = true;
    if (e.ctrlKey) {
      zoomin = false;
    }

    // Pan with Shift
    let zoomfactor = 2;
    if (e.shiftKey) {
      zoomfactor = 1;
    }

    // Zoom the fractal at the mouse position
    zoomFractal(pos.x, pos.y, zoomfactor, zoomin);

    // Generate a new image
    generateImage();
  }

  // Get the mouse position
  function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
      x : Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
      y : Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
  }

  // Call init to start the game
  init();
};