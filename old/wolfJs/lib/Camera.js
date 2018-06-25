export class Camera {
  constructor(x, y, dir, fov, map) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.fov = fov;
    //this.sX = 0;
    //this.sY = 0;
    this.map = map;
    this.maxSpeed = 0.04;
    this.speed = 0.0;
    this.rot = 0;
    this.maxRot = 0.03;
    this.dx = 0;
    this.dy = 0;
  }

  update(dT) {
    // move the camera, if some keys are pressed
    this.dir = this.dir + this.rot;
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;


    let dx = Math.cos(this.dir);
    let dy = Math.sin(this.dir);

    var length = Math.sqrt(dx*dx+dy*dy); //calculating length
    this.dx = dx/length; //assigning new value to x (dividing x by lenght of the vector)
    this.dy= dy/length; //assigning new value to y


  }
}