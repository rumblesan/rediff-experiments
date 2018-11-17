class Field {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    this.data = new Float32Array(width * height);
  }

  set(i, v) {
    this.data[i] = v;
  }

  get(i) {
    return this.data[i];
  }

  setCell(x, y, v) {
    this.data[x * this.width + y] = v;
  }

  getCell(x, y) {
    if (x < 0) {
      x += this.width;
    } else if (x >= this.width) {
      x -= this.width;
    }
    if (y < 0) {
      y += this.height;
    } else if (y >= this.height) {
      y -= this.height;
    }
    return this.data[x * this.height + y];
  }
}
