"use strict";

class NnRunner {

  constructor(nn) {
    this.nn = nn;
    this.trainingdata = undefined;
    this.testdata = undefined;


  }

  run(iterations, reportingInterval) {

    for(let i = 0; i < iterations; i++) {
      let data = random(this.trainingdata);
      if(i % reportingInterval === 0) {
        console.log(i, this.nn.train(data.input, data.target), data);
      } else {
        this.nn.train(data.input, data.target)
      }
    }
  }

  setTraningDataset(data) {
    this.trainingdata = data;
  }

  setTestingDataset(data) {
    this.testdata = data;
  }

}


if (typeof module !== 'undefined') {
  module.exports = NnRunner;
}