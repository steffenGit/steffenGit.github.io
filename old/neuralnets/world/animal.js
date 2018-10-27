"use strict";

class Animal {
  constructor(x, y, world, cellSize) {
    this.x = x;
    this.y = y;
    this.world = world;

    this.cellSize = cellSize;
    this.color = 255;
    this.food = 0;
    this.brain = undefined;
    this.setupBrain();
  }

  draw(sketch) {
    fill(this.color, 255 - this.color, 255 - this.color);
    ellipse(this.x * this.cellSize + 2 + this.cellSize / 2, this.y * this.cellSize + 2 + this.cellSize / 2, this.cellSize - 2);
  }

  insertBrain(brain) {
    this.brain = brain;
  }


  setupBrain() {
    this.brain = new NN(0.15);
    this.brain.addLayer(8, 'input')
        .addLayer(6, 'hidden')
        // .addLayer(6, 'hidden')
        // .addLayer(5, 'hidden')
        .addLayer(5, 'hidden')
        .addLayer(4, 'output');


  }

  eat(x, y) {
    x = x || this.x;
    y = y || this.y;
    this.food += this.world.grid(x, y);
    this.world.setGrid(x, y, 0);
    console.log(this.food);
  }

  moveUp() {
    this.world.setGrid(this.x, this.y, 0);
    this.y--;
    if (this.y < 0) this.y++;
    this.eat();
    this.world.setGrid(this.x, this.y, -1);
  }

  moveDown() {
    this.world.setGrid(this.x, this.y, 0);
    this.y++;
    if (this.y >= this.world.h) this.y--;
    this.eat();
    this.world.setGrid(this.x, this.y, -1);

  }

  moveLeft() {
    this.world.setGrid(this.x, this.y, 0);
    this.x--;
    if (this.x < 0) this.x++;
    this.eat();
    this.world.setGrid(this.x, this.y, -1);
  }

  moveRight() {
    this.world.setGrid(this.x, this.y, 0);
    this.x++;
    if (this.x >= this.world.w) this.x--;
    this.eat();
    this.world.setGrid(this.x, this.y, -1);
  }

  update() {
    let perceivedWorld = this.perceive();
    let action = this.brain.predict(perceivedWorld);
    console.log(action.toArray());
    let highestScore = 0;
    let which = -1;
    action.toArray().forEach((a, i) => {
      if (a > highestScore) {
        highestScore = a;
        which = i;
      }
    });

    switch (which) {
      case 0:
        this.moveUp();
        break;
      case 1:
        this.moveRight();
        break;
      case 2:
        this.moveDown();
        break;
      case 3:
        this.moveLeft();
        break;
      default:
        console.log('no such action ' + which);

    }

  }

  perceive() {
    let perceived = [];
    perceived.push(this.world.grid(this.x, this.y - 1));
    perceived.push(this.world.grid(this.x + 1, this.y));

    perceived.push(this.world.grid(this.x, this.y + 1));
    perceived.push(this.world.grid(this.x - 1, this.y));

    perceived.push(this.world.grid(this.x+1, this.y - 1));
    perceived.push(this.world.grid(this.x + 1, this.y+1));
    perceived.push(this.world.grid(this.x-1, this.y + 1));
    perceived.push(this.world.grid(this.x - 1, this.y-1));

    return perceived;

  }
}