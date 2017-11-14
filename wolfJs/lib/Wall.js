export class Wall {
  constructor(type) {
    this.type = type;
    switch (type) {
      case 1:
        this.color = 'red';
        break;
      case 2:
        this.color = 'orchid';
        break;
      case 3:
        this.color = 'orange';
        break;
      case 4:
        this.color = 'green';
        break;
      case 5:
        this.color = 'cyan';
        break;
      default:
        this.color = 'pink';
    }
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}