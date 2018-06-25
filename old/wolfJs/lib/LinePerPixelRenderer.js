export class LinePerPixelRenderer {
    
    constructor(scene, ctx, width, height, scalingFactor) {
    this.scene = scene;
    this.m = scene.map;
    this.c = scene.camera;
    this.ctx = ctx;
    this.w = width;
    this.h = height;
    this.bufferBg = ctx.createImageData(this.w, this.h);
    this.backBuffer = ctx.createImageData(this.w, this.h);
    this.frontBuffer = ctx.createImageData(this.w, this.h);


    this.prefillBufferBg();

    }


    prefillBufferBg() {
    for (let i = 0; i < this.w*this.h*4; i+=4) {
        if(i < this.w*this.h*2) {
        this.bufferBg.data[i + 0] = 0xf0;
        this.bufferBg.data[i + 1] = 0xf0;
        this.bufferBg.data[i + 2] = 0xf0;
        this.bufferBg.data[i + 3] = 0xff;
        }else {
        this.bufferBg.data[i + 0] = 0xc0;
        this.bufferBg.data[i + 1] = 0xc0;
        this.bufferBg.data[i + 2] = 0xc0;
        this.bufferBg.data[i + 3] = 0xff;

        }
    }

    }


    render(dT) {
    this.renderBackground();
    this.renderWalls();


    // swap buffers
    //[this.backBuffer, this.frontBuffer] = [this.frontBuffer, this.backBuffer];

    // draw on canvas
    this.ctx.putImageData(this.backBuffer, 0, 0);
    }

    renderBackground() {
    this.backBuffer.data.set(this.bufferBg.data);
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

        // draw line
        this.drawVertLine(i, length, [255, 255, 255, 255]);
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
            s: 'dark',
            t: i,
            d: this.getDistance(x, y, vXVert, vYVert)
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
            s: '',
            t: i,
            d: this.getDistance(x, y, vXHor, vYHor)
        };
        hitHor = true;
        }
        vYHor += sY;
        vXHor += tanDir * flipHor;
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

    drawVertLine(x, h, c) {
    let offset = this.h/2 - h/2
    offset = Math.floor(offset);
    for(let i = 0; i < h; i++) {
        this.drawPixel(x, offset + i, c);
    }
    }

    drawPixel (x, y, c) {
    let i = y*this.w*4 + x*4;
    this.backBuffer.data.set(c, i);
    
    }


}