class Simulation {
  constructor(canvasEl) {
    this.config = {
      rows: 160,
      columns: 160,
      cellSize: 5,
      generationsPerSecond: 30,
    };

    this.state = {
      running: false,
      cells: {},
    };

    this.grid = new Field(
      canvasEl,
      this.config.columns,
      this.config.rows,
      this.config.cellSize
    );

    this.reaction = new Reaction(this.config.columns, this.config.rows);

    for (var x = 0; x < this.config.columns; x = x + 1) {
      this.state.cells[x] = {};
      for (var y = 0; y < this.config.rows; y = y + 1) {
        this.state.cells[x][y] = {
          a: 0,
          b: 0,
        };
      }
    }
  }

  start() {
    var sim = this;
    setInterval(function() {
      sim.draw();

      if (sim.state.running) {
        sim.update();
      }
    }, 1000 / this.config.generationsPerSecond);
  }

  togglePause() {
    this.state.running = !this.state.running;
  }

  randomise() {
    for (var x = 0; x < this.config.columns; x = x + 1) {
      for (var y = 0; y < this.config.rows; y = y + 1) {
        this.state.cells[x][y] = {
          a: Math.random(),
          b: Math.random(),
        };
      }
    }
  }

  draw() {
    for (var x = 0; x < this.config.columns; x = x + 1) {
      for (var y = 0; y < this.config.rows; y = y + 1) {
        this.grid.drawCell(x, y, this.state.cells[x][y]);
      }
    }
  }

  update() {
    this.state.cells = this.reaction.run(this.state.cells);
  }
}
