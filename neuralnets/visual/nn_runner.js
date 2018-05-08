"use strict";

class NnRunner {

  constructor(nn) {
    this.nn = nn;
    this.trainingdata = undefined;
    this.testdata = undefined;

  }

  run(iterations, reportingInterval, reportingCallback) {
    let results = [];
    for (let i = 0; i < iterations; i++) {
      let data = this.trainingdata.pop();
      if (i % reportingInterval === 0) {
         results.push(this.nn.train(data.input, data.target));
        if (reportingCallback)
          reportingCallback();
      } else {
        this.nn.train(data.input, data.target)
      }
    }
    //console.log('done training');
    return results;
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