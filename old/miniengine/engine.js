"use strict";

class SpriteSheet {
  constructor(imageSrc, spriteWidth, spriteHeight) {
    this.imageSrc = imageSrc;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  drawSprite(ctx, spriteIndex, x, y, transform) {
    console.log(ctx, spriteIndex, x, y);
  }
}

class Sprite {
  constructor(spriteSheet, index) {
    this.spriteSheet = spriteSheet;
    this.index = index;
  }

  draw(ctx, x, y) {
    this.spriteSheet.drawSprite(ctx, this.index);
  }
}

class Animation {
  constructor(spriteSheet, indices) {
    this.spriteSheet = spriteSheet;
    this.frames = indices;
    this.currentFrame = 0;
    this.playing = undefined;
  }

  play(fps) {
    console.log('go ', 1000 / fps);
    this.playing = setInterval(x => this.tick(), 1000 / fps);
  }

  stop() {
    clearInterval(this.playing);
    this.playing = undefined;
    this.currentFrame = 0;
  }

  pause() {
    clearInterval(this.playing);
    this.playing = undefined;
  }

  tick() {
    this.currentFrame++;
    console.log('tick ', this.currentFrame);
    if (this.currentFrame >= this.frames.length) this.currentFrame = 0;
  }

  draw(ctx, x, y) {
    this.spriteSheet.drawSprite(ctx, this.frames[this.currentFrame]);
  }
}

class Entity {

  constructor() {
  }

  update(dt) {
    console.log('updating empty entity');
  }

  draw(ctx) {
    console.log('drawing empty entity');
  }
}

class Scene {

  constructor() {
    this.entities = [];
  }

  addEntity(entity, layer) {

  }

  removeEntity() {

  }

  clearEntities() {

  }

  update(dt) {

  }

  draw() {

  }
}