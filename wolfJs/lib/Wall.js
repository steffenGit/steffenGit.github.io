export class Wall {
  constructor(type, id) {
    this.id = id;
    this.type = type;
    this.texture = new Image(64, 64);
    switch (type) {
      case 1:
        this.color = 'red';
        this.rgb = [218, 113, 113];
        this.texture.src = 'textures/blocks/red_sandstone_normal.png';
        break;
      case 2:
        this.color = 'orchid';
        this.rgb = [218, 112, 214];
        this.texture.src = 'textures/blocks/concrete_powder_magenta.png';
        break;
      case 3:
        this.color = 'orange';
        this.rgb = [255, 165, 0];
        this.texture.src = 'textures/blocks/coarse_dirt8.png';
        break;
      case 4:
        this.color = 'green';
        this.rgb = [0, 128, 0];
        this.texture.src = 'textures/blocks/cobblestone_mossy.png';
        break;
      case 5:
        this.color = 'cyan';
        this.rgb = [0, 255, 255];
        this.texture.src = 'textures/blocks/lapis_block.png';
        break;
      default:
        this.color = 'pink';
        this.rgb = [255, 192, 203];
        this.texture.src = '/textures/blocks/concrete_red.png';
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