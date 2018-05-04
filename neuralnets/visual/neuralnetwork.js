"use strict";

class NeuralNetwork {
  constructor(layerFormat, inputFormat) {
    if (layerFormat.length < 1) throw Error('Network needs at least 1 layer, got '+ layerFormat.length);
    if (inputFormat.length < 1) throw Error('Network needs at least 1 input, got '+ inputFormat.length);
    // layers = [3, 3, 2] => 3 hidden nodes, 3 hidden nodes, 2 outputnodes
    this.layers = layerFormat;
    this.inputs = inputFormat;
    // Array of weight matrices between the layers;
    this.weights = new Array(layerFormat.length);
    this.biasis = new Array(layerFormat.length);

    this._initWeightsAndBiasis();
  }

  evaluate(input, target) {
    return NeuralNetwork._error(this.guess(input), target);
  }

  guess(input) {
    return this._guessRecursively(this.layers-1, input);
  }

  train(input, target) {
    let error = this.evaluate(input, target);
    let errorMatrices = this._calcErrorMatrices(error);
    this._adjustWeightsAndBiasis(errorMatrices);
    return error;
  }
  _guessRecursively(layerIndex, input) {
    // return the input, if this is the inputlayer
    if (layerIndex < 0) return input;
    //calculate its own output from the output of its inputs*weight+bias => _activate
    return NeuralNetwork._activate(this.weights[layerIndex] * this._guessRecursively(layerIndex - 1, input) + this.biasis[layerIndex]);
  }


  _initWeightsAndBiasis() {

  }

  _calcErrorMatrices(error) {

  }

  _adjustWeightsAndBiasis(errorMatrices) {

  }

  static _activate(weightedSum) {
    return sign(weightedSum);
  }

  static _error(output, target) {

  }


}

