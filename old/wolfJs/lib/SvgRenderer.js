export class SvgRenderer {
    
  constructor(scene, ctx, width, height, scalingFactor) {
    this.scene = scene;
    this.m = scene.map;
    this.c = scene.camera;
    this.ctx = ctx;
    this.w = width;
    this.h = height;
  }

  render(dT) {
    this.renderBackground();
    this.renderWalls();

  }

  renderBackground() {
    this.ctx.fillStyle = 'lightGrey';
    this.ctx.fillRect(0, 0, this.w, this.h / 2);
    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(0, this.h / 2, this.w, this.h);
  }

  renderWalls() {
    let x = this.c.x;
    let y = this.c.y;
    let dir = this.c.dir;
    let fov = this.c.fov;

    let deltaAngle = fov / this.w;
    let angleLeft = dir + fov / 2;
    let angleRight = dir - fov / 2;

    for (let i = 0; i < this.w; i++) {
      let dir = angleRight + i * deltaAngle;
      let intersection = this.getIntersection(x, y, dir);
      let length = this.getLineLength(intersection.d);

      // this.ctx.strokeStyle = intersection.s + intersection.t.color;
      this.ctx.strokeStyle = intersection.t.rgbString(intersection.d);
      this.ctx.beginPath();
      this.ctx.moveTo(i+0.5, this.h / 2 - length / 2);
      this.ctx.lineTo(i+0.5, this.h / 2 + length / 2);
      this.ctx.stroke();
    }

  }

  getIntersection(x, y, dir) {



    let intersectVert = this.getIntersectVert(x, y, dir);
    let intersectHor = this.getIntersectHor(x, y, dir);



    if (intersectHor.d <= intersectVert.d) return intersectHor;
    else return intersectVert;
  }

  getIntersectVert(x, y, dir) {

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

    let tanDir = Math.tan(dir);

    if (vX > 0) {
      sX = 1;
      vXVert = mapX + 1;
      vYVert = mapY + tanDir * flipVert * (1 - dX) + dY;

    }
    else if (vX < 0) {
      sX = -1;
      flipVert = -1;
      vXVert = mapX;
      vYVert = mapY + tanDir * flipVert * dX + dY;
    }

    while (vXVert < this.m.width && vXVert > 0 && !hitVert) {
      let i;
      if (i = this.isHit(vXVert, vYVert, 'vert')) {
        intersectVert = {
          x: vXVert,
          y: vYVert,
          t: i,
          d: this.getDistance(x, y, vXVert, vYVert, dir, this.c.dir)
        };
        hitVert = true;

      }

      vXVert += sX;
      vYVert += tanDir * flipVert;
    }

    return intersectVert;
  }

  getIntersectHor(x, y, dir) {

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

    let tanDir = Math.tan(Math.PI / 2 - dir);

    if (vY > 0) {
      sY = 1;
      vYHor = mapY + 1;
      vXHor = x + tanDir * flipHor * (1 - dY);
    }
    else if (vY < 0) {
      sY = -1;
      flipHor = -1;
      vYHor = mapY;
      vXHor = x + tanDir * flipHor * dY;
    }


    while (vYHor < this.m.height && vYHor > 0 && !hitHor) {

      let i;
      if (i = this.isHit(vXHor, vYHor, 'hor')) {
        intersectHor = {
          x: vXHor,
          y: vYHor,
          t: i,
          d: this.getDistance(x, y, vXHor, vYHor, dir, this.c.dir)
        };
        hitHor = true;
      }
      vYHor += sY;
      vXHor += tanDir * flipHor;
    }

    return intersectHor;
  }

  getDistance(x1, y1, x2, y2, dir, camDir) {
    let d2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    let d = (x2-x1)*Math.cos(-camDir) - (y2-y1)*Math.sin(-camDir);
    return Math.abs((d+d2)/2);
  }




  isHit(x, y, axis) {
    let mapX = Math.floor(x);
    let mapY = Math.floor(y);

    if (x <= 0 || x >= this.m.width) return true;
    if (y <= 0 || y >= this.m.height) return true;

    let hitfield = undefined;
    let type = 0;
    if (axis === 'vert') {
      if (this.m.getTile(mapX, mapY).type > 0) { 
        hitfield = this.m.getTile(mapX, mapY); 
      }
      if (this.m.getTile(mapX - 1, mapY).type > 0) { 
        hitfield = this.m.getTile(mapX - 1, mapY); 
      }
    }
    else if (axis === 'hor') {
      if (this.m.getTile(mapX, mapY).type > 0) { 
        hitfield = this.m.getTile(mapX, mapY); 
      }
      if (this.m.getTile(mapX, mapY - 1).type > 0) { 
        hitfield = this.m.getTile(mapX, mapY - 1); 
      }
    }

    return hitfield;

  }

  getLineLength(d) {

    let height = 400;
    let l = height / d;



    return l;

  }


}