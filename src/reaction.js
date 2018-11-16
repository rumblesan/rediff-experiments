class Reaction {
  constructor({ columns, rows, killRate, feedRate, laplace }) {
    this.config = {
      laplace,
      killRate,
      feedRate,
      columns,
      rows,
    };
  }

  run(cells) {
    let max = 0;
    let min = 10;
    const { feedRate, killRate } = this.config;
    const newCells = {};
    for (var x = 0; x < this.config.columns; x = x + 1) {
      newCells[x] = {};
      for (var y = 0; y < this.config.rows; y = y + 1) {
        var a = this.cellValue(cells, 'a', x, y);
        var b = this.cellValue(cells, 'b', x, y);
        var newA =
          this.laplacian(cells, 'a', x, y) - a * b * b + feedRate * (1 - a);
        if (newA > max) {
          max = newA;
        }
        if (newA < min) {
          min = newA;
        }
        var newB =
          this.laplacian(cells, 'b', x, y) +
          a * b * b -
          a * (killRate + feedRate);
        if (newB > max) {
          max = newB;
        }
        if (newB < min) {
          min = newB;
        }
        newCells[x][y] = {
          a: newA,
          b: newB,
        };
      }
    }
    const scalar = max - min;
    for (var x = 0; x < this.config.columns; x = x + 1) {
      for (var y = 0; y < this.config.rows; y = y + 1) {
        newCells[x][y].a = (newCells[x][y].a - min) / scalar;
        newCells[x][y].b = (newCells[x][y].b - min) / scalar;
      }
    }
    return newCells;
  }

  nextCellValue(cells, key, x, y) {
    return this.laplacian(cells, key, x, y);
  }

  laplacian(cells, key, x, y) {
    let out = 0;
    out +=
      this.cellValue(cells, key, x - 1, y - 1) *
      this.config.laplace['-1']['-1'];
    out +=
      this.cellValue(cells, key, x, y - 1) * this.config.laplace['0']['-1'];
    out +=
      this.cellValue(cells, key, x + 1, y - 1) * this.config.laplace['1']['-1'];
    out +=
      this.cellValue(cells, key, x - 1, y) * this.config.laplace['-1']['0'];
    out += this.cellValue(cells, key, x, y) * this.config.laplace['0']['0'];
    out += this.cellValue(cells, key, x + 1, y) * this.config.laplace['1']['0'];
    out +=
      this.cellValue(cells, key, x - 1, y + 1) * this.config.laplace['-1']['1'];
    out += this.cellValue(cells, key, x, y + 1) * this.config.laplace['0']['1'];
    out +=
      this.cellValue(cells, key, x + 1, y + 1) * this.config.laplace['1']['1'];
    return out;
  }

  cellValue(cells, key, x, y) {
    if (!cells[x]) {
      if (x < 0) {
        x += this.config.columns;
      } else if (x >= this.config.columns) {
        x -= this.config.columns;
      } else {
        return 0;
      }
    }
    if (!cells[x][y]) {
      if (y < 0) {
        y += this.config.rows;
      } else if (y >= this.config.rows) {
        y -= this.config.rows;
      } else {
        return 0;
      }
    }
    if (cells[x] && cells[x][y] && cells[x][y][key]) {
      return cells[x][y][key];
    }
    return 0;
  }
}
