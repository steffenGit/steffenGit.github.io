"use strict";

const WIDTH = 200;
const HEIGHT = 200;

// make p5 shit available outside the sketches
let random;
let constrain;
// function constrain(min, val, max) {
//   if (min > val) return min;
//   if (max < val) return max;
//   return val;
// }

let fastFitness = function (sourceImg, targetImg) {
  let target = targetImg.pixels;
  sourceImg.loadPixels();
  let src = sourceImg.pixels;
  let score = 0;

  for (let i = 0; i < src.length; i++) {
    if ((i + 1) % 4 === 0) continue;
    // TODO: check correct error
    score += Math.floor(Math.abs(target[i] - src[i])) ** 2;
    // score += Math.floor(Math.abs(target[i] - src[i]));
  }
  return score;
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Point(this.x, this.y);
  }

  mutate(mr) {
    const POINT_MUTATION_RATE = mr || 0.05;
    const POINT_MUTATION_MAX_VALUE = 15;

    if (random() < POINT_MUTATION_RATE) {
      this.x += random(-POINT_MUTATION_MAX_VALUE, POINT_MUTATION_MAX_VALUE);
      this.y += random(-POINT_MUTATION_MAX_VALUE, POINT_MUTATION_MAX_VALUE);
      this.x = Math.floor(constrain(this.x, 0, WIDTH));
      this.y = Math.floor(constrain(this.y, 0, HEIGHT));
    }
  }

  static createRandom() {
    return new Point(
        Math.floor(random(WIDTH)),
        Math.floor(random(HEIGHT))
    )
  }

}

class Polygon {
  constructor() {
    this.points = [];
    this.brush = undefined;
  }

  copy() {
    let p = new Polygon();

    this.points.forEach(point => {
      p.points.push(point.copy())
    });
    p.brush = this.brush.copy();
    return p;
  }

  static createRandom() {
    let p = new Polygon();
    let l = Math.floor(random(3, 4));
    for (l; l >= 0; l--) {
      p.points.push(Point.createRandom());
    }
    p.brush = Brush.createRandom();
    return p;
  }

  mutate(mr) {
    // return;
    const POLY_MUTATION_RATE = mr || 0.02;
    const POLY_MIN_POINTS = 3;
    const POLY_MAX_POINTS = 7;
    this.points.forEach(p => p.mutate());
    this.brush.mutate();


    if (random() < POLY_MUTATION_RATE) {


      if (this.points.length <= POLY_MIN_POINTS) {
        this.points.push(Point.createRandom());
      } else if (this.points.length >= POLY_MAX_POINTS) {
        this.points.splice(Math.floor(random(this.points.length)), 1);
      }

      let choice = random();

      if (choice < 0.33) {
        this.points.push(Point.createRandom());
      } else if (choice < 0.66) {
        this.points.splice(Math.floor(random(this.points.length)), 1);
      }
      else {
        let toChange = this.points.splice(Math.floor(random(this.points.length)), 1)[0];
        this.points.push(toChange);
      }

    }
  }

  draw(sketch) {
    sketch.noStroke();
    sketch.fill(this.brush.r, this.brush.g, this.brush.b, this.brush.a);
    sketch.beginShape();
    this.points.forEach(p => {
      sketch.vertex(p.x, p.y);
    });
    sketch.endShape(sketch.CLOSE);
  }
}

class Brush {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static createRandom() {
    let r = Math.floor(random(255));
    let g = Math.floor(random(255));
    let b = Math.floor(random(255));
    let a = Math.floor(random(30, 80));

    if (r > 200 && g > 200 && b > 200) a = Math.floor(random(150, 200));
    if (r > 225 && g > 225 && b > 225) a = Math.floor(random(180, 235));

    return new Brush(r, g, b, a);
  }

  copy() {
    return new Brush(this.r, this.g, this.b, this.a);
  }

  mutate(mr) {
    const BRUSH_MUTATION_RATE = mr || 0.1;
    const BRUSH_MUTATION_MAX_VALUE = 10;

    if (random() < BRUSH_MUTATION_RATE) {
      this.r += random(-BRUSH_MUTATION_MAX_VALUE, BRUSH_MUTATION_MAX_VALUE);
      this.g += random(-BRUSH_MUTATION_MAX_VALUE, BRUSH_MUTATION_MAX_VALUE);
      this.b += random(-BRUSH_MUTATION_MAX_VALUE, BRUSH_MUTATION_MAX_VALUE);
      this.a += random(-BRUSH_MUTATION_MAX_VALUE, BRUSH_MUTATION_MAX_VALUE);
      this.r = Math.floor(constrain(this.r, 0, 255));
      this.g = Math.floor(constrain(this.g, 0, 255));
      this.b = Math.floor(constrain(this.b, 0, 255));

      if (this.r > 200 && this.g > 200 && this.b > 200) this.a = Math.floor(random(150, 200));
      if (this.r > 225 && this.g > 225 && this.b > 225) this.a = Math.floor(random(180, 235));

      this.a = Math.floor(constrain(this.a, 30, 255));
    }
  }
}

class Drawing {
  constructor() {
    this.polys = [];
    this.polys.push(Polygon.createRandom());
  }

  copy() {
    let d = new Drawing();
    this.polys.forEach(p => d.polys.push(p.copy()));
    return d;
  }

  mutate(mr) {
    const DRAWING_MUTATION_RATE = mr || 0.1;
    const DRAWING_MIN_POLYS = 5;
    const DRAWING_MAX_POLYS = 100;

    if (random() < DRAWING_MUTATION_RATE) {
      if (this.polys.length <= DRAWING_MIN_POLYS) {
        this.polys.push(Polygon.createRandom());
      } else if (this.polys.length >= DRAWING_MAX_POLYS) {
        this.polys.splice(Math.floor(random(this.polys.length)), 1);
      }

      let choice = random();

      if (choice < 0.33) {
        this.polys.push(Polygon.createRandom());
      } else if (choice < 0.66) {
        this.polys.splice(Math.floor(random(this.polys.length)), 1);
      }
      else {
        let toChange = this.polys.splice(Math.floor(random(this.polys.length)), 1)[0];
        this.polys.push(toChange);
        // console.log('shuffle polygons');
        // console.log(toChange);

      }
    }

    this.polys.forEach(p => p.mutate());
  }

  draw(sketch) {
    this.polys.forEach(p => p.draw(sketch));
  }
}


let img;
let fittest;
let current;
let highscore = 10e20;
let dirty = true;

let sketchMain = function (sketch) {
  sketch.preload = function () {
    random = sketch.random;
    constrain = sketch.constrain;
    img = sketch.loadImage('big.jpg');
    current = new Drawing();
    fittest = current.copy();
  };


  sketch.setup = function () {
    sketch.background(255);

    //frameRate(1);
    let canvas = sketch.createCanvas(WIDTH, HEIGHT);
    console.log(canvas);
    console.log(img);
    img.loadPixels();

  };

  let ctAll = 0;
  let ctBest = 0;
  let mr = 0.15;
  sketch.draw = function () {
    ctAll++;
    // TODO adaptive mutation rate, for whcih 'layer'?
    current.mutate();
    // current.mutate(mr);
    sketch.background(255);
    current.draw(sketch);
    let f = fastFitness(sketch, img, 40000);
    // console.log(f);
    if (f < highscore) {
      ctBest++;
      highscore = f;

      // TODOmutation rate
      mr = highscore / (200 * 200 * 3 * 1000);

      fittest = current.copy();
      console.log('better: ', ctBest, ctAll, highscore, mr);
      // console.log('better: ', ctBest, ctAll, highscore, Math.sqrt(highscore)/(200*200*3));
      dirty = true;
    }
    current = fittest.copy();

  };
};

let sketchCur = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(WIDTH, HEIGHT);

  };

  sketch.draw = function () {
    if (dirty) {
      sketch.background(255);
      fittest.draw(sketch);
      dirty = false;
    }
  };
};

let myMainSketch = new p5(sketchMain);
let myCurSketch = new p5(sketchCur);
