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

  feedForward(input_matrix) {
    if (this.type === 'input') {
      return input_matrix;
    }
    let output = Matrix.multiply(this.weights, input_matrix);
    output.add(this.bias).map(sigmoid);
    return output;
  }
}

class NN {
  constructor(learningRate) {
    this.layers = [];
    this.lr = learningRate;
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
    let output = this.feedForward(input);
    console.log('--------------------------------');
    input.print();
    output[output.length-1].print();

  }

  train(input_array, target_array) {
    // feed forward
    let input = Matrix.fromArray(input_array);
    let target = Matrix.fromArray(target_array);
    let outputs = this.feedForward(input);
    //backpropagate
    return this.backPropagate(outputs, target)
  }

  /**
   * feeds the inputdata into the network. returns an array
   * of one outputmatrix per layer.
   * @param input_array
   * @returns {*|*[]}
   */
  feedForward(input) {

    // reduce the layer to an array of error matrices, feeding the input data
    // into layer 0 = 'input'-layer as seed for the reduce function
    let output = this.layers.reduce((a, c, i) => {
      // to avoid duplication with the seed data
      if (i > 0) {
        // add the output of the current layer to the aggregation array
        // the input to the prediction is the output of the layer before
        a.push(c.feedForward(a[a.length - 1]));
      }
      return a;
    }, [input]);
    return output;
  }

  backPropagate(outputs, target) {
    // TODO: Needs massive rework
    let iInput = 0;
    let iOutput = this.layers.length-1;

    let error;
    let retval;
    for(let i = iOutput; i > iInput; i--) {

      // 1. calculate error
      if(i === iOutput) {
        error = Matrix.subtract(target, outputs[i]);
        retval = Matrix.subtract(target, outputs[i]);
      } else {
        let weightsTransposed = Matrix.transpose(this.layers[i+1].weights);
        error = Matrix.multiply(weightsTransposed, error);
      }

      // 2. calculate gradient
      let gradient = Matrix.map(outputs[i], dsigmoid);
      gradient.multiply(error);
      gradient.multiply(this.lr);

      // 3. calculate deltas
      let inputsTransposed = Matrix.transpose(outputs[i-1]);
      let dWeight = Matrix.multiply(gradient, inputsTransposed);

      //4. adjust weights
      this.layers[i].weights.add(dWeight);
      this.layers[i].bias.add(gradient);
    }

    return retval;
  }
}

if (typeof module !== 'undefined') {
  module.exports = NN;
}