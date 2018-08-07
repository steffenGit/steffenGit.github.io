"use strict";

let context = new AudioContext();
let vco;
let vca;


function initAudio() {
  /* VCO */
  vco = context.createOscillator();
  //vco.type = vco.SINE;
  vco.frequency.value = 200;
  vco.start(0);

  /* VCA */
  vca = context.createGain();
  vca.gain.value = 0;

  /* Connections */
  vco.connect(vca);
  vca.connect(context.destination);
  console.log('init audio done');
}




function startPlay(frequency, length) {
  console.log('start playing at ' + frequency);
  vco.frequency.value = frequency;
  vca.gain.value = 1;
  setTimeout(stopPlay, length);
}

function stopPlay() {
  console.log('stoppped playing');
  vca.gain.value = 0;
}