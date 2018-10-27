"use strict";
/**
 * complete copy of tinymusic by XXXXX
 *
 * refactored into classes
 *
 * TODO: this can be much shorts, depending on the features needed.
 * @type {string}
 */

// ENHARMONICS directly copied from tinymusic

const ENHARMONICS = 'B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb';
const MIDDLE_C = 440 * Math.pow(Math.pow(2, 1 / 12), -9);
const NUMERIC = /^[0-9.]+$/;
const OCTAVE_OFFSET = 4;
const SPACE = /\s+/;
const NUMBER = /(\d+)/;
const OFFSETS = {};

// populate the offset lookup (note distance from C, in semitones)
ENHARMONICS.split('|').forEach((val, i) => {
  val.split('-').forEach((note) => {
    OFFSETS[note] = i;
  });
});

/**
 * convert a note name (e.g. 'A4') to a frequency (e.g. 440.00).
 * @param name the note name
 */
let getFrequency = (name) => {
  let couple = name.split(NUMBER);
  let distance = OFFSETS[couple[0]];
  let octaveDiff = (couple[1] || OCTAVE_OFFSET) - OCTAVE_OFFSET;
  let freq = MIDDLE_C * Math.pow(Math.pow(2, 1 / 12), distance);
  return freq * Math.pow(2, octaveDiff);
};


export class Note {

  constructor(when, name, duration, instrument) {
    this.when = when;
    // frequency, in Hz
    this.frequency = getFrequency(name);
    // duration, as a ratio of 1 beat (quarter note = 1, half note = 0.5, etc.)
    this.duration = duration;
    this.instrument = instrument;
  }


}

export class Sequence {
  /**
   * create a new Sequence of Notes.
   * @param audioContext pass an AudioContext. Will be created if left out.
   * @param tempo BPM
   * @param noteArray The notes.
   */
  constructor(audioContext, tempo, noteArray, settings, analyzerNode) {
    this.ac = audioContext || new AudioContext();
    this.createFxNodes(analyzerNode);
    this.tempo = tempo || 120;
    this.loop = false;
    this.notes = noteArray;

    this.settings = settings;

    this.bass.gain.value = settings.bass;
    this.mid.gain.value = settings.mid;
    this.treble.gain.value = settings.treble;

    if(settings.waveType === 'custom') {
      this.createCustomWave(settings.customR, settings.customI);
    }
  }

  /**
   * TODO: clean it up
   * create gain and EQ nodes, then connect 'em
   * @returns {Sequence}
   */
  createFxNodes(analyzerNode) {
    let eq = [['bass', 100], ['mid', 1000], ['treble', 2500]];
    let prev = this.gain = this.ac.createGain();
    eq.forEach(function (config, filter) {
      filter = this[config[0]] = this.ac.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = config[1];
      prev.connect(prev = filter);
    }.bind(this));
    if(analyzerNode) {
      prev.connect(analyzerNode);
      analyzerNode.connect(this.ac.destination);
    } else {
      prev.connect(this.ac.destination);
    }
    return this;
  }


  /**
   *  create a custom waveform as opposed to "sawtooth", "triangle", etc
   **
   * @param real
   * @param imag
   */
  createCustomWave(real, imag) {
    // Allow user to specify only one array and dupe it for imag.
    if (!imag) {
      imag = real;
    }

    // Wave type must be custom to apply period wave.
    this.settings.waveType = 'custom';

    // Reset customWave
    this.settings.customWave = [new Float32Array(real), new Float32Array(imag)];
  }

  /**
   * recreate the oscillator node (happens on every play).
   * @returns {Sequence}
   */
  createOscillator() {
    this.stop();
    this.osc = this.ac.createOscillator();

    // customWave should be an array of Float32Arrays. The more elements in
    // each Float32Array, the dirtier (saw-like) the wave is
    if (this.settings.customWave) {
      this.osc.setPeriodicWave(
          this.ac.createPeriodicWave.apply(this.ac, this.settings.customWave)
      );
    } else {
      this.osc.type = this.settings.waveType || 'square';
    }

    this.osc.connect(this.gain);
    return this;
  };

  /**
   * schedules this.notes[ index ] to play at the given time.
   * returns an AudioContext timestamp of when the note will *end*.
   * @param index
   * @returns {*}
   */
  scheduleNote(index) {
    let when = 60 / this.tempo * this.notes[index].when;
    let duration = 60 / this.tempo * this.notes[index].duration;
    let cutoff = duration * (1 - (this.settings.staccato || 0));

    let attack = cutoff * this.settings.attack;
    let fade = cutoff * this.settings.fade;
    this.gain.gain.setValueAtTime(0, when);
    this.gain.gain.linearRampToValueAtTime(this.settings.gain, when + attack);
    this.gain.gain.setValueAtTime(this.settings.gain, when + fade);
    this.gain.gain.linearRampToValueAtTime(0, when + cutoff);


    this.setFrequency(this.notes[index].frequency, when);


    this.setFrequency(0, when + cutoff);
    return when + duration;
  }

  /**
   * get the next note.
   *
   * @param index
   * @returns {*}
   */
  getNextNote(index) {
    return this.notes[index < this.notes.length - 1 ? index + 1 : 0];
  }


  /**
   * set frequency at time.
   * @param freq
   * @param when
   * @returns {Sequence}
   */
  setFrequency(freq, when) {
    this.osc.frequency.setValueAtTime(freq, when);
    return this;
  }


  /**
   * run through all notes in the sequence and schedule them.
   * TODO LOW: could return a promise
   * @param when
   * @returns {Sequence}
   */
  play(when) {
    when = typeof when === 'number' ? when : this.ac.currentTime;

    this.createOscillator();
    // this.osc.start(this.notes[0].when);
    this.osc.start(60 / this.tempo * this.notes[0].when);

    this.notes.forEach((note, i) =>{
      when = this.scheduleNote(i);
    });

    this.osc.stop(when);
    // TODO clean this up
    this.osc.onended = this.loop ? this.play.bind(this, when) : null;

    return this;
  }


  /**
   * stop playback, null out the oscillator, cancel parameter automation.
   * @returns {Sequence}
   */
  stop() {
    if (this.osc) {
      this.osc.onended = null;
      this.osc.disconnect();
      this.osc = null;
    }
    return this;
  }

}



