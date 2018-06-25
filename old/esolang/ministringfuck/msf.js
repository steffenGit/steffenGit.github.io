"use strict";

export class Msf {
  constructor(code) {
    if (code)
      this._code = code.split('');
    this._pc = 0;
    this._memory = 0;
    this._output = '';
    console.log('init done');
  }

  _inc() {
    this._memory = (this._memory + 1) % 256;
  }

  _print() {
    this._output += String.fromCharCode(this._memory);
  }


  _evalToken() {
    let token = this._code[this._pc];
    switch (token) {
      case '+':
        this._inc();
        break;
      case '.':
        this._print();
        break;
      default:
        throw Error('no such token: ' + token + ' at ' + this._pc + ' of ' + this._code.length + '. mem: ' + this._memory);
    }
  }

  reset() {
    this._pc = 0;
    this._memory = 0;
    this._output = 0;
  }

  loadCode(code) {
    this._code = code.split('');
    console.log('loaded code');
    console.log(this._code);
  }

  getFormattedCodeP() {


    return '<p>' + (this._code.map((token, i) => {
      if(i === this._pc) {
        return  '<span class="codePc" id="pc">' + token + ' </span>';
      }
      // else if ( i % 50 === 0) {
      //   return '<br>' + token;
      // }
      else return token + ' ';
    }).join('')) + '</p>';
  }


  tick() {
    //if(this._pc >= this._code.length) return false;
    this._evalToken();
    this._pc++;
    return this._pc < this._code.length;
  }

  getPc() {
    return this._pc;
  }

  getMemory() {
    return this._memory;
  }

  getOutput() {
    return this._output;
  }


}
