export class Camera {
  constructor(x, y, dir, fov) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.fov = fov;
  }

  update(dT) {
    // move the camera, if some keys are pressed
    let i = 2 * Math.PI / (60 * 5)
    this.dir = this.dir + i;
    this.x -= 0.005;
    this.y -= 0.003;
  }
}