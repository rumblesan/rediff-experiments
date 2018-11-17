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
      width: 200,
      height: 200,
      scaling: 3,
      generationsPerSecond: 10,
    };

    this.state = {
      running: false,
      tprev: 0,
      fps: 0,
    };

    this.canvas = new Canvas(canvasEl, this.config);

    this.reaction = new Reaction(this.config);
  }

  start() {
    const sim = this;
    sim.state.tprev = Date.now();
    const t = 1000 / this.config.generationsPerSecond;
    const run = function() {
      const start = Date.now();
      sim.draw();
      sim.update();
      const tdiff = Date.now() - start;
      setTimeout(run, t - tdiff);
    };

    run();
  }

  togglePause() {
    this.state.running = !this.state.running;
  }

  randomise() {
    this.reaction.randomise();
  }

  draw() {
    const cells = this.reaction.getCells();
    this.canvas.draw(cells.a);
    console.log('fps', this.state.fps);
  }

  update() {
    if (this.state.running) {
      this.reaction.run();

      const now = Date.now();
      const tdiff = now - sim.state.tprev;
      this.state.tprev = now;
      this.state.fps = 1000 / tdiff;
    } else {
      this.state.fps = 0;
    }
  }
}
