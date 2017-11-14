import {Wall} from '../lib/Wall.js';
import {Ground} from '../lib/Ground.js';


export class Map {
  constructor(width, height, tileWidth, tileHeight) {
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    this.tiles = new Array(this.width * this.height);
  }

  load(tileTypeArray) {
    for (let i = 0; i < tileTypeArray.length; i++) {
      let t = tileTypeArray[i];
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      if (t == 0) {
        this.setTile(x, y, new Ground(t));

      } else {
        this.setTile(x, y, new Wall(t));
      }
    }
  }

  getTile(x, y) {
    let i = Math.floor(y) * this.width + Math.floor(x);
    //console.log(x, y, i);
    return this.tiles[i];
  }


  setTile(x, y, tile) {
    this.tiles[Math.floor(y) * this.width + Math.floor(x)] = tile;
    tile.setPos(x, y);
  }
}