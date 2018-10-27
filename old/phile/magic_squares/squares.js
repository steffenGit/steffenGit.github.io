"use strict";

export class MagicSquare {

  constructor(size, maxVal) {
    this.size = size;
    this.maxVal = maxVal;
    this.current = [];

    for (let y = 0; y < this.size; y++) {
      this.current[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.current[y][x] = 0;
      }
      console.log(this.current[y]);
    }
  }

  solve() {
    let results = [];
    console.log('start solve');
    console.log(this.current);
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        for (let i = 0; i <= this.maxVal; i++) {
          this.current[y][x] = i;
          if (this.check()) {
            console.log('found');
            this.print();
          }
        }
      }
    }
    console.log('done');
    return this.current;
  }

  check() {
    console.log('checkin');

    let val = 0;


    for (let y = 0; y < this.size; y++) {
      let curVal = 0;
      for (let x = 0; x < this.size; x++) {
        curVal += this.current[y][x];
      }

      if (val === 0) {
        val = curVal;
      } else {
        if (val !== curVal) {
          console.log('noo ', y, val, curVal);
          this.print();
          return false;
        }
      }

    }
    console.log('yes');
    return true;
  }


  print() {
    let d = document.getElementById('container');
    d.innerHTML += '<hr>';
    for (let y = 0; y < this.size; y++) {
      d.innerHTML += '</br>';
      for (let x = 0; x < this.size; x++) {
        d.innerHTML += '<span> ' + this.current[y][x] + ' </span>';
      }
      console.log(this.current[y]);
    }
  }

}