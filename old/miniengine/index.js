"use strict";


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2D');

let s = new SpriteSheet('src', 16, 16);

let a = new Animation(s, [1, 2, 3]);
a.play(3);