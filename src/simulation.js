const BasicLaplace = function() {
  return {
    '-1': { '-1': 0.05, '0': 0.2, '1': 0.05 },
    '0': { '-1': 0.2, '0': -1, '1': 0.2 },
    '1': { '-1': 0.05, '0': 0.2, '1': 0.05 },
  };
};

const LeftLaplace = function() {
  return {
    '-1': { '-1': 0.5, '0': 0.2, '1': 0.075 },
    '0': { '-1': 0.2, '0': -1, '1': 0.2 },
    '1': { '-1': 0.25, '0': 0.2, '1': 0.05 },
  };
};

class Simulation {
  constructor(canvasEl) {
    this.config = {
      killRate: 0.0649,
      laplace: BasicLaplace(),
      feedRate: 0.0367,
      rows: 160,
      columns: 160,
      cellSize: 5,
      generationsPerSecond: 10,
    };

    this.state = {
      running: false,
      cells: {},
      tprev: 0,
      fps: 0,
    };

    this.grid = new Field(canvasEl, this.config);

    this.reaction = new Reaction(this.config);

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
    const sim = this;
    sim.state.tprev = Date.now();
    const t = 1000 / this.config.generationsPerSecond;
    const run = function() {
      sim.draw();
      if (sim.state.running) {
        sim.update();

        const now = Date.now();
        const tdiff = now - sim.state.tprev;
        sim.state.tprev = now;
        sim.state.fps = 1000 / tdiff;
      } else {
        sim.state.fps = 0;
      }
      setTimeout(run, t);
    };

    run();
  }

  togglePause() {
    this.state.running = !this.state.running;
  }

  randomise() {
    for (var x = 0; x < this.config.columns; x = x + 1) {
      for (var y = 0; y < this.config.rows; y = y + 1) {
        this.state.cells[x][y] = {
          a: 1,
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
    console.log('fps', this.state.fps);
  }

  update() {
    this.state.cells = this.reaction.run(this.state.cells);
  }
}
