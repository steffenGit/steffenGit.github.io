import { Wall } from '../lib/Wall.js';
import { Ground } from '../lib/Ground.js';

export class MapRenderer {

  constructor(scene, ctx) {
    this.scene = scene;
    this.m = scene.map;
    this.c = scene.camera;
    this.ctx = ctx;
  }

  render(dT) {
    this.renderMap();

    this.renderGrid();
    this.renderCamera();
    this.raycast();
  }

  renderMap() {
    for (let t of this.m.tiles) {
      let ox = t.x * this.m.tileWidth;
      let oy = t.y * this.m.tileHeight;
      this.ctx.fillStyle = t.color;
      this.ctx.fillRect(ox, oy, this.m.tileWidth, this.m.tileHeight);
    }
  }

  renderGrid() {
    this.ctx.strokeStyle = 'black';
    for (let t of this.m.tiles) {
      let ox = t.x * this.m.tileWidth;
      let oy = t.y * this.m.tileHeight;
      this.ctx.beginPath();
      this.ctx.rect(ox, oy, this.m.tileWidth, this.m.tileHeight);
      this.ctx.stroke();
    }
  }

  renderCamera() {
    let scale = this.m.tileWidth;
    let length = 10;

    let dirX = this.c.x + length * Math.cos(this.c.dir);
    let dirY = this.c.y + length * Math.sin(this.c.dir);

    let fovLeftAngle = this.c.dir + this.c.fov / 2;
    let fovRightAngle = this.c.dir - this.c.fov / 2;

    let fovLeftX = this.c.x + length * Math.cos(fovLeftAngle);
    let fovLeftY = this.c.y - length * Math.sin(fovLeftAngle);

    let fovRightX = this.c.x + length * Math.cos(fovRightAngle);
    let fovRightY = this.c.y - length * Math.sin(fovRightAngle);

    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(this.c.x * scale, this.c.y * scale, scale / 2, 0, 2 * Math.PI);
    this.ctx.moveTo(this.c.x * scale, this.c.y * scale);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineTo(dirX * scale, dirY * scale);

    this.ctx.moveTo(this.c.x * scale, this.c.y * scale);
    //this.ctx.lineTo(fovLeftX * scale, fovLeftY * scale);

    this.ctx.strokeStyle = 'blue';
    this.ctx.moveTo(this.c.x * scale, this.c.y * scale);
    //this.ctx.lineTo(fovRightX * scale, fovRightY * scale);
    this.ctx.stroke();

  }

  raycast() {

    let scale = this.m.tileWidth;


    let x = this.c.x;
    let y = this.c.y;
    let dir = this.c.dir;
    let fov = this.c.fov;

    let deltaAngle = fov / 5;
    let angleLeft = dir + fov / 2;
    let angleRight = dir - fov / 2;

    //let dir = angleLeft - i*deltaAngle;
    let intersection = this.getIntersection(x, y, dir);
    this.ctx.strokeStyle = 'silver';
    this.ctx.beginPath();
    this.ctx.arc(intersection.x * scale, intersection.y * scale, 3, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  getIntersection(x, y, dir) {



    let intersectVert = this.getIntersectVert(x, y, dir);
    let intersectHor = this.getIntersectHor(x, y, dir);



    if (intersectHor.d <= intersectVert.d) return intersectHor;
    else return intersectVert;
  }


  getIntersectVert(x, y, dir) {
    let scale = this.m.tileWidth;

    let mapX = Math.floor(x);
    let dX = x - mapX;
    let mapY = Math.floor(y);
    let dY = y - mapY;

    let vX = Math.cos(dir);
    let vY = Math.sin(dir);

    let sX = 0, sY = 0;
    let flipVert = 1;

    let vXVert;
    let vYVert;

    let hitVert = false;
    let intersectVert = {};

    if (vX > 0) {
      sX = 1;
      vXVert = mapX + 1;
      vYVert = mapY + Math.tan(dir) * flipVert * (1 - dX) + dY;

    }
    else if (vX < 0) {
      sX = -1;
      flipVert = -1;
      vXVert = mapX;
      vYVert = mapY + Math.tan(dir) * flipVert * dX + dY;
    }

    while (vXVert < this.m.width && vXVert > 0 && !hitVert) {

      this.ctx.strokeStyle = 'lightblue';
      this.ctx.beginPath();
      this.ctx.arc(vXVert * scale, vYVert * scale, 3, 0, 2 * Math.PI);
      this.ctx.stroke()

      if (this.isHit(vXVert, vYVert, 'vert')) {
        intersectVert = {
          x: vXVert,
          y: vYVert,
          d: this.getDistance(x, y, vXVert, vYVert)
        };
        hitVert = true;

      }

      vXVert += sX;
      vYVert += Math.tan(dir) * flipVert;
    }

    return intersectVert;
  }

  getIntersectHor(x, y, dir) {
    let scale = this.m.tileWidth;

    let mapX = Math.floor(x);
    let dX = x - mapX;
    let mapY = Math.floor(y);
    let dY = y - mapY;


    let vX = Math.cos(dir);
    let vY = Math.sin(dir);


    let sX = 0, sY = 0;
    let flipHor = 1;


    let hitHor = false;
    let intersectHor = {};
    let vYHor;
    let vXHor;


    if (vY > 0) {
      sY = 1;
      vYHor = mapY + 1;
      vXHor = x + Math.tan(Math.PI / 2 - dir) * flipHor * (1 - dY);
    }
    else if (vY < 0) {
      sY = -1;
      flipHor = -1;
      vYHor = mapY;
      vXHor = x + Math.tan(Math.PI / 2 - dir) * flipHor * dY;
    }


    while (vYHor < this.m.height && vYHor > 0 && !hitHor) {

      this.ctx.strokeStyle = 'orange';
      this.ctx.beginPath();
      this.ctx.arc(vXHor * scale, vYHor * scale, 3, 0, 2 * Math.PI);
      this.ctx.stroke()

      if (this.isHit(vXHor, vYHor, 'hor')) {
        intersectHor = {
          x: vXHor,
          y: vYHor,
          d: this.getDistance(x, y, vXHor, vYHor)
        };
        hitHor = true;
      }
      vYHor += sY;
      vXHor += Math.tan(Math.PI / 2 - dir) * flipHor;
    }

    return intersectHor;
  }


  
  getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  isHit(x, y, axis) {
    let mapX = Math.floor(x);
    let mapY = Math.floor(y);

    if (x <= 0 || x >= this.m.width) return true;
    if (y <= 0 || y >= this.m.height) return true;

    let hitfield = 0;
    if (axis === 'vert') {
      if (this.m.getTile(mapX, mapY).type > 0) hitfield = 1;
      if (this.m.getTile(mapX - 1, mapY).type > 0) hitfield = 2;
    }
    else if (axis === 'hor') {
      if (this.m.getTile(mapX, mapY).type > 0) hitfield = 3;
      if (this.m.getTile(mapX, mapY - 1).type > 0) hitfield = 4;
    }

    return hitfield > 0;

  }


}