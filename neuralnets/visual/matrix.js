"use strict";

class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.data = new Array(this.rows);

    for (let i = 0; i < rows; i++) {
      this.data[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        this.data[i][j] = 0;
      }
    }

  }

  add(n) {
    if (!isNaN(n)) {
      // n is a number
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    } else if (n instanceof Matrix) {
      // n is a matrix
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n[i][j];
        }
      }
    }
    return this;
  }

  subtract(n) {
    if (!isNaN(n)) {
      // n is a number
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] -= n;
        }
      }
    } else if (n instanceof Matrix) {
      // n is a matrix
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] -= n[i][j];
        }
      }
    }
    return this;
  }

  multiply(n) {
    if (!isNaN(n)) {
      // n is a number
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    } else if (n instanceof Matrix) {
      // n is a matrix

      if(this.cols !== n.rows) {
        console.log('this.cols must match n.rows, got', this.cols, n.rows);
        return undefined;
      }
      let a = this;
      let b = n;

      let result = new Matrix(a.rows, b.cols);
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for(let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }
      this.rows = result.rows;
      this.cols = result.cols;
      this.data = result.data;
    }
    return this;

  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = this.data[j][i];
      }
    }
    this.rows = result.rows;
    this.cols = result.cols;
    this.data = result.data;
  }

  print() {
    console.table(this.data);
    return this;
  }

  randomInt() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.floor(Math.random() * 10);
      }
    }
    return this;
  }

  random() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
    return this;
  }

  static add(a, b) {
    console.log('not implemented');
    if(!a instanceof Matrix) {
      console.log('a needs to be a Matrix. got', typeof a);
      return undefined;
    }
    if (!isNaN(b)) {
      // b is a number

    } else if (b instanceof Matrix) {
      // b is a matrix
    }
  }

  static subtract(a, b) {
    console.log('not implemented');
    if(!a instanceof Matrix) {
      console.log('a needs to be a Matrix. got', typeof a);
      return undefined;
    }
    if (!isNaN(b)) {
      // b is a number

    } else if (b instanceof Matrix) {
      // b is a matrix
    }
  }

  static multiply(a, b) {
    if(!a instanceof Matrix) {
      console.log('a needs to be a Matrix. got', typeof a);
      return undefined;
    }
    let result;
    if (!isNaN(b)) {
      result = new Matrix(a.rows, a.cols);
      // n is a number
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          result.data[i][j] = a.data[i][j] * n;
        }
      }
    } else if (b instanceof Matrix) {
      // n is a matrix

      if(a.cols !== b.rows) {
        console.log('this.cols must match n.rows, got', a.cols, b.rows);
        return undefined;
      }


      result = new Matrix(a.rows, b.cols);
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for(let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }
    }

    return result;
  }

  static transpose(a) {
    let result = new Matrix(a.cols, a.rows);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[j][i];
      }
    }
    return result;
  }


}