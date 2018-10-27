"use strict";


function getNumberedArray(length) {
  return [...Array(length).keys()];
}

function checkArrayForPrimes(array) {
  return array.map(n => isPrime(n));
}

function getPrimeArray(array) {
  let s = [];
  //array.forEach((p, i) => s += (p ? i : '_'));
  array.forEach((p, i) => p ? s.push(i): false);
  return s;
}

function countPrimesÎnArray(array) {
  return array.filter(n => n).length;
}


/**
 * naive wiki implementation of dK +-1
 * @param n
 * @returns {boolean}
 */
function isPrime(n) {
  if (n <= 1) return false;
  else if (n <= 3) return true;
  else if (n % 2 === 0 || n % 3 === 0) return false;
  let i = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}


function easyCountPrimesUpTo(m) {
  let s = 0;
  for(let i = 1; i <= m; i++) {
    if(isPrime(i)) s++;
  }

  return s;
}
/*


Input: an integer n > 1.

 Let A be an array of Boolean values, indexed by integers 2 to n,
 initially all set to true.

 for i = 2, 3, 4, ..., not exceeding √n:
   if A[i] is true:
     for j = i2, i2+i, i2+2i, i2+3i, ..., not exceeding n:
       A[j] := false.

 Output: all i such that A[i] is true.
 */
function sieveOfEratosthenes(n) {
  let a = Array(n).fill(true, 2);
  a[0] = false;
  a[1] = false;

  for(let i = 2; i <= Math.sqrt(n); i++) {

    if(a[i]) {
      let c = 0;
      for(let j = i**2; j < n; j=i**2 + c*i) {
        a[j] = false;
        c++;
      }
    }
  }
  return a;
}

function eratostenesCount(n) {

}

function gaussPrimesUpTo(m) {
  return Math.round(m/Math.log(m));
}


let m = 100000000;


console.log('\neasyCountPrimesUpTo');
console.time('easyCountPrimesUpTo');
console.log(easyCountPrimesUpTo(m));
console.timeEnd('easyCountPrimesUpTo');

/*
console.log('\ngaussPrimesUpTo');
console.time('gaussPrimesUpTo');
console.log(gaussPrimesUpTo(m));
console.timeEnd('gaussPrimesUpTo');
*/
console.log('\nsieveOfEratosthenes');
console.time('sieveOfEratosthenes');
console.log(getPrimeArray(sieveOfEratosthenes(m)).length);
console.timeEnd('sieveOfEratosthenes');