// ------------------------------------------------------------------------
// Drawing Mandelbrot Fractals With HTML5 Canvas And JavaScript
// (c) 2015 Rembound.com
// http://rembound.com/articles/drawing-mandelbrot-fractals-with-html5-canvas-and-javascript
// ------------------------------------------------------------------------

// The function gets called when the window is fully loaded
window.onload = function () {
  // Get the canvas and context
  var canvas = document.getElementById("viewport");
  var context = canvas.getContext("2d");

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Width and height of the image
  var imagew = canvas.width;
  var imageh = canvas.height;

  let offX = imagew/3;
  let offY = imageh;
  let scale = 300;
  // Image Data (RGBA)
  var imagedata = context.createImageData(imagew, imageh);



  const f1 = {
    a:0.0,
    b:0.0,
    c:0.0,
    d:0.16,
    e:0.0,
    f:0.0,
    p:0.01,
    name: "stem",
    color : [10, 196, 10]
  };
  const f2 = {
    a:0.85,
    b:0.04,
    c:-0.04,
    d:0.85,
    e:0.0,
    f:1.6,
    p:0.85,
    name: "Successively smaller leaflets",
    color : [10, 196, 10]
  };
  const f3 = {
    a:0.2,
    b:-0.26,
    c:0.23,
    d:0.22,
    e:0.0,
    f:1.0,
    p:0.07,
    name: "Largest left-hand leaflet",
    color : [10, 196, 10]

  };
  const f4 = {
    a:-0.15,
    b:0.28,
    c:0.26,
    d:0.24,
    e:0.0,
    f:0.44,
    p:0.07,
    name: "Largest right-hand leaflet",
    color : [10, 196, 10]
  };

  function pickFunction(functions) {
    maxRnd = 0;
    for (let func of functions) {
      maxRnd += func.p;
    }

    let rnd = Math.random() * maxRnd;
    threshold = 0;
    for(let func of functions) {
      threshold += func.p;
      if(rnd <= threshold) {
        return func;
      }
    }
  }

  function evalFern(func, xn, yn) {
    let x = func.a * xn + func.b * yn + func.e;
    let y = func.c * xn + func.d * yn + func.f;
    return {x, y};
  }

  // Generate the fractal image
  function generateImage(maxIterations, functions) {

    let x0 = 0;
    let y0 = 0;
    for (let i = 0; i < maxIterations; i++) {
      let func = pickFunction(functions);
      let {x,y} = evalFern(func, x0, y0);
      x0 = x;
      y0 = y;
      setPixel(x,y, func.color);

    }

    context.putImageData(imagedata, 0, 0);

  }

  function setPixel(x, y, color) {
    // Apply the color
    x = Math.floor(x*scale + offX);
    y = Math.floor(-y*scale + offY);
    //console.log(x, y);

    if(x < 0 || y < 0 || x > imagew || y > imageh)
      return;

    let pixelindex = (y * imagew + x) * 4;
    imagedata.data[pixelindex] = color[0];
    imagedata.data[pixelindex + 1] = color[1];
    imagedata.data[pixelindex + 2] = color[2];
    imagedata.data[pixelindex + 3] = 255;


  }


  let guiController = {
    render : function() {
      render();
    },
    scale: 100,
    iterationsPerInterval : 2000,
    animationLength : 5000,
  };

  function render() {
    console.time('all');
    imagedata = context.createImageData(imagew, imageh)
    context.stroke();
    scale = guiController.scale;
    // Generate image
    let interval = setInterval(() => {
      generateImage(guiController.iterationsPerInterval, [f1, f2, f4, f3]);
    },16);

    setTimeout(() => {
      clearInterval(interval);
      console.timeEnd('all');
    },guiController.animationLength);
  }






  let gui = new dat.GUI({
    height : 5 * 32 - 1
  });
  gui.remember(guiController);
  gui.add(guiController, 'render');
  gui.add(guiController, 'scale');
  gui.add(guiController, 'iterationsPerInterval');
  gui.add(guiController, 'animationLength');
  render(guiController);
};