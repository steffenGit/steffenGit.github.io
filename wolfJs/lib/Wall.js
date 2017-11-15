export class Wall {
  constructor(type) {
    this.type = type;
    switch (type) {
      case 1:
        this.color = 'red';
        this.rgb = [218, 113, 113];
        break;
      case 2:
        this.color = 'orchid';
        this.rgb = [218, 112, 214];
        break;
      case 3:
        this.color = 'orange';
        this.rgb = [255, 165, 0];
        break;
      case 4:
        this.color = 'green';
        this.rgb = [0, 128, 0];
        break;
      case 5:
        this.color = 'cyan';
        this.rgb = [0, 255, 255];
        break;
      default:
        this.color = 'pink';
        this.rgb = [255, 192, 203];
    }
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
  rgbString(d) {
    if(!d)
      return 'rgb(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ')';

    let f = 2/(d*d);
    return 'rgb(' + Math.floor(f*this.rgb[0]) + ', ' + Math.floor(f*this.rgb[1]) + ', ' + Math.floor(f*this.rgb[2]) + ')';
  }
 
}