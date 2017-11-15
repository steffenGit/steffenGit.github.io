export class Ground {
  constructor(type) {
    this.type = type;
    switch (type) {
      case 0:
        this.color = 'grey';
        this.rgb = [128, 128, 128];
        break;
      default:
        this.color = 'brown';
        this.rgb = [128, 128, 128];
    }
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  rgbString() {
    return 'rgb(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ')';
  }
}