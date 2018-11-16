class Field {
  constructor(canvasEl, columns, rows, cellSize) {
    this.config = {
      cellSize,
    };

    canvasEl.width = columns * cellSize;
    canvasEl.height = rows * cellSize;

    this.ctx = canvas.getContext('2d');
  }

  drawCell(x, y, cell) {
    this.ctx.fillStyle = this.genColour(cell.a);
    const x1 = x * this.config.cellSize;
    const x2 = (x + 1) * this.config.cellSize;
    const y1 = y * this.config.cellSize;
    const y2 = (y + 1) * this.config.cellSize;
    this.ctx.fillRect(x1, y1, x2, y2);
  }

  genColour(value) {
    return `hsl(${value * 360},100%,50%)`;
  }
}
