"use strict";

import {Msf} from "./msf.js";

(function() {
  let msf = new Msf();

  let outputDiv = document.getElementById('outputDiv');
  let codeDiv = document.getElementById('codeDiv');
  let codeInputText = document.getElementById('codeInputText');
  let loadCodeButton = document.getElementById('loadCodeButton');
  let tickButton = document.getElementById('tickButton');
  let autoplayButton = document.getElementById('autoplayButton');

  loadCodeButton.onclick = e => {
    msf.loadCode(codeInputText.value);
    codeDiv.innerHTML = msf.getFormattedCodeP();
  };

  tickButton.onclick = e => {
    msf.tick();
    outputDiv.innerHTML = msf.getOutput();
    codeDiv.innerHTML = msf.getFormattedCodeP();
  };

  autoplayButton.onclick = e => {

    let interval = setInterval(() => {
      let res = msf.tick();
      outputDiv.innerHTML = msf.getOutput();
      codeDiv.innerHTML = msf.getFormattedCodeP();
      let pc = document.getElementById('pc');
      if(pc) codeDiv.scrollTop = pc.offsetTop;
      //codeDiv.innerHTML = msf.getMemory();
      if(!res){
        clearInterval(interval);

        console.log('DONE');
      }
    }, 0);

  };


})();