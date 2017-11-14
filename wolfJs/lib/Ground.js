export class Ground {
  constructor(type) {
    this.type = type;
    switch (type) {
      case 0:
        this.color = 'grey';
        break;
      default:
        this.color = 'brown';
    }
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}