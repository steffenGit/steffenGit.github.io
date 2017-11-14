export class Camera {
  constructor(x, y, dir, fov, map) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.fov = fov;
    this.sX = -1;
    this.sY = -1;
    this.map = map;
  }

  update(dT) {
    // move the camera, if some keys are pressed
    let i = 2 * Math.PI / (60 * 5)
    this.dir = this.dir + i;
    this.x += 0.007 * this.sX;
    this.y += 0.007 * this.sY;

    let mapX = Math.floor(this.x);
    let mapY = Math.floor(this.y);
    if (this.map.getTile(mapX+this.sX, mapY).type > 0) this.sX *= -1;
    if (this.map.getTile(mapX, mapY+this.sY).type > 0) this.sY *= -1;
  }
}