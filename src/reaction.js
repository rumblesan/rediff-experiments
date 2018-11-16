class Reaction {
  constructor(columns, rows) {
    this.config = {
      kill: 0.1,
      feed: 0.1,
      columns,
      rows,
    };
  }

  run(cells) {
    let maxA = 0;
    let minA = 10;
    let maxB = 0;
    let minB = 10;
    const { feed, kill } = this.config;
    const newCells = {};
    for (var x = 0; x < this.config.columns; x = x + 1) {
      newCells[x] = {};
      for (var y = 0; y < this.config.rows; y = y + 1) {
        var a = this.cellValue(cells, 'a', x, y);
        var b = this.cellValue(cells, 'b', x, y);
        var newA =
          this.laplacian(cells, 'a', x, y) - a * b * b + feed * (1 - a);
        if (newA > maxA) {
          maxA = newA;
        }
        if (newA < minA) {
          minA = newA;
        }
        var newB =
          this.laplacian(cells, 'b', x, y) + a * b * b - a * (kill + feed);
        if (newB > maxB) {
          maxB = newB;
        }
        if (newB < minB) {
          minB = newB;
        }
        newCells[x][y] = {
          a: newA,
          b: newB,
        };
      }
    }
    const scalarA = maxA - minA;
    const scalarB = maxB - minB;
    for (var x = 0; x < this.config.columns; x = x + 1) {
      for (var y = 0; y < this.config.rows; y = y + 1) {
        newCells[x][y].a = (newCells[x][y].a - minA) / scalarA;
        newCells[x][y].b = (newCells[x][y].b - minB) / scalarB;
      }
    }
    return newCells;
  }

  nextCellValue(cells, key, x, y) {
    return this.laplacian(cells, key, x, y);
  }

  laplacian(cells, key, x, y) {
    let out = 0;
    out += this.cellValue(cells, key, x - 1, y - 1) * 0.05;
    out += this.cellValue(cells, key, x, y - 1) * 0.2;
    out += this.cellValue(cells, key, x + 1, y - 1) * 0.05;
    out += this.cellValue(cells, key, x - 1, y) * 0.2;
    out += this.cellValue(cells, key, x, y) * -1;
    out += this.cellValue(cells, key, x + 1, y) * 0.2;
    out += this.cellValue(cells, key, x - 1, y + 1) * 0.05;
    out += this.cellValue(cells, key, x, y + 1) * 0.2;
    out += this.cellValue(cells, key, x + 1, y + 1) * 0.05;
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
