"use strict";

let baseConvert = (number, initialBase, changeBase) => {
  if ((initialBase && changeBase) < 2 || (initialBase && changeBase) > 36)
    return 'Base between 2 and 36';

  return parseInt(number + '', initialBase).toString(changeBase);
};


let getBases2toX = (numberBase10, x) => {
  let ret = [];
  for (let i = 2; i <= x; i++) {
    ret.push(baseConvert(numberBase10, 10, i));
  }
  return ret;
};

let doesStringContainOtherThan0and1 = (number) => {
  number += '';
  let ret = false;
  let numberArray = number.split('');
  numberArray.forEach(n => {
    if (n !== '1' && n !== '0') {
      ret = true;
    }
  });
  return ret;
};

let fitsAll = (numbers) => {
  let dirty = false;
  numbers.forEach(n => {
    if(doesStringContainOtherThan0and1(n)) {
      dirty = true;
    }
  });
  return !dirty;
};

let findFirstToFitTilBaseX = (x) => {

  let number = 2;
  let found = false;
  //console.log('findFirstToFitTilBaseX ' , x);
  while(!found) {
    let numbers = getBases2toX(number, x);
    //console.log(numbers);
    if(fitsAll(numbers)) {
      //console.log('fitsAll', number);
      found = true;
    }

    if(number%100000 === 0) console.log(number);
    number++;

  }

  return number-1;

};

let x = 5;
console.log(x, findFirstToFitTilBaseX(x));