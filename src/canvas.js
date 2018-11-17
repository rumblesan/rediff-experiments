class Canvas {
  constructor(canvasEl, { width, height, scaling }) {
    this.ctx = canvas.getContext('2d');
    this.config = {
      width,
      height,
      scaling: scaling || 1,
    };

    canvasEl.width = width * this.config.scaling;
    canvasEl.height = height * this.config.scaling;
  }

  draw(field) {
    const { width, height } = this.config;
    for (var x = 0; x < width; x = x + 1) {
      for (var y = 0; y < height; y = y + 1) {
        const cPos = x * width + y;
        const v = field[cPos];
        this.drawPoint(x, y, field[cPos]);
      }
    }
  }

  drawPoint(x, y, value) {
    this.ctx.fillStyle = this.genColour(value);
    const x1 = x * this.config.scaling;
    const x2 = x + this.config.scaling;
    const y1 = y * this.config.scaling;
    const y2 = y + this.config.scaling;
    this.ctx.fillRect(x1, y1, x2, y2);
  }

  genColour(value) {
    return `hsl(${value * 360},100%,50%)`;
  }
}
