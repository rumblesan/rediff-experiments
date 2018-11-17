class Reaction {
  constructor({ width, height, killRate, feedRate }) {
    this.config = {
      killRate,
      feedRate,
      width,
      height,
    };
    const len = width * height;
    this.state = {
      a: {
        main: new Field(this.config),
        work: new Field(this.config),
      },
      b: {
        main: new Field(this.config),
        work: new Field(this.config),
      },
    };
  }

  randomise() {
    const len = this.config.width * this.config.height;
    for (let i = 0; i < len; i += 1) {
      this.state.a.main.set(i, Math.random());
      this.state.a.work.set(i, 0);
      this.state.b.main.set(i, Math.random());
      this.state.b.work.set(i, 0);
    }
  }

  getCells() {
    return {
      a: this.state.a.main.data,
      b: this.state.b.main.data,
    };
  }

  run() {
    let max = 0;
    let min = 10;
    const { feedRate, killRate } = this.config;
    for (var x = 0; x < this.config.width; x = x + 1) {
      for (var y = 0; y < this.config.height; y = y + 1) {
        var a = this.state.a.main.getCell(x, y);
        var b = this.state.b.main.getCell(x, y);

        var newA = this.laplacian('a', x, y) - a * b * b + feedRate * (1 - a);
        if (newA > max) {
          max = newA;
        }
        if (newA < min) {
          min = newA;
        }
        var newB =
          this.laplacian('b', x, y) + a * b * b - a * (killRate + feedRate);
        if (newB > max) {
          max = newB;
        }
        if (newB < min) {
          min = newB;
        }
        this.state.a.work.setCell(x, y, newA);
        this.state.b.work.setCell(x, y, newB);
      }
    }

    const scalar = max - min;
    for (var x = 0; x < this.config.width; x = x + 1) {
      for (var y = 0; y < this.config.height; y = y + 1) {
        this.state.a.main.setCell(
          x,
          y,
          (this.state.a.work.getCell(x, y) - min) / scalar
        );
        this.state.b.main.setCell(
          x,
          y,
          (this.state.b.work.getCell(x, y) - min) / scalar
        );
      }
    }
  }

  laplacian(key, x, y) {
    let out = 0;
    out += this.state[key].main.getCell(x - 1, y - 1) * 0.05;
    out += this.state[key].main.getCell(x + 0, y - 1) * 0.2;
    out += this.state[key].main.getCell(x + 1, y - 1) * 0.05;
    out += this.state[key].main.getCell(x - 1, y + 0) * 0.2;
    out += this.state[key].main.getCell(x + 0, y + 0) * -1;
    out += this.state[key].main.getCell(x + 1, y + 0) * 0.2;
    out += this.state[key].main.getCell(x - 1, y + 1) * 0.05;
    out += this.state[key].main.getCell(x + 0, y + 1) * 0.2;
    out += this.state[key].main.getCell(x + 1, y + 1) * 0.05;
    return out;
  }
}
