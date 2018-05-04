"use strict";


//import * as Matrix from "./matrix";

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  // return sigmoid(x) * (1 - sigmoid(x));
  return y * (1 - y);
}

class Layer {
  constructor(size, type, inputSize) {
    this.size = size;
    this.bias = new Matrix(size, 1).ones();
    this.weights = null;
    this.type = type;

    if (inputSize) {
      this.inputSize = inputSize;
      this.weights = new Matrix(size, inputSize).randomize();
      this.bias = new Matrix(size, 1).randomize();
    }
  }

  predict(input_matrix) {
    if(this.type === 'input') {
      return input_matrix;
    }
    let output = Matrix.multiply(this.weights, input_matrix);
    output.add(this.bias).map(sigmoid);
    return output;
  }
}

class NN {
  constructor() {
    this.layers = [];
  }

  addLayer(size, type) {
    let layer;
    if (this.layers.length < 1) {
      layer = new Layer(size, type);
    } else {
      layer = new Layer(size, type, this.layers[this.layers.length - 1].size);
    }
    this.layers.push(layer);
    return this;
  }

  predict(input_array) {
    let input = Matrix.fromArray(input_array);

  }

  reducePredict(input_array) {
    let input = Matrix.fromArray(input_array);
    let output = this.layers.reduce((a, c, i) => {
      if (i>0)
        a.push(c.predict(a[a.length-1]));
      return a;
    }, [input]);
    return output;
  }
}

if (typeof module !== 'undefined') {
  module.exports = NN;
}