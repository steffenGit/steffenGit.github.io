export class Scene {
  constructor(map, camera) {
    this.map = map;
    this.camera = camera;
  }

  update(dT) {
    this.camera.update(dT);
  }

}