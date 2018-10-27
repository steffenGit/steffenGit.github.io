"use strict";
const NUM_FOOD = 50;


class World {
  constructor(w, h, cellSize) {
    this.w = w;
    this.h = h;
    this.cellSize = cellSize;
    this._grid = [];
    this.setupGrid();
    this.placeFood(NUM_FOOD);

  }

  grid(x, y) {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return 0;
    try {
      return this._grid[y][x];
    } catch (e) {

      console.log(this._grid);
      console.log(x, y, this.w, this.h);
      throw Error();
    }
  }

  setGrid(x, y, val) {
    try {
      this._grid[y][x] = val;
    } catch (e) {
      console.log(this._grid);
      console.log(x, y, this.w, this.h);
      throw Error();
    }
  }

  draw(sketch) {
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        // noFill();
        let color = this.grid(x, y) * 255;
        fill(255 - color, 255, 255 - color);
        rect(x * this.cellSize + 2, y * this.cellSize + 2, this.cellSize - 2, this.cellSize - 2);

      }
    }
  }


  setupGrid() {
    for (let y = 0; y < this.h; y++) {
      this._grid[y] = [];
      for (let x = 0; x < this.w; x++) {
        this._grid[y][x] = 0;
      }
    }
  }

  placeFood(numberOfFood) {
    for (let i = 0; i < numberOfFood; i++) {
      let rndX = Math.floor(Math.random() * W);
      let rndY = Math.floor(Math.random() * H);
      this.setGrid(rndX, rndY, 10);

    }
  }
}