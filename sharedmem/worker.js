/**
 * Created by peleikis on 31.01.2017.
 */
"use strict";
importScripts('lock_es6.js');

(function () { // BEGIN iife

  self.addEventListener('message', function (event) {
    const {sharedBuffer} = event.data;
    const sharedArray = new Int32Array(sharedBuffer); // (A)
    const lock = new Lock(sharedArray, 0);
    // ···

    console.log('\tlocking');
    lock.lock();
    console.log('\tgot lock');
    lock.unlock();

  });


})(); // END iife
