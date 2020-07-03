class Simulation {
  constructor(canvasEl) {
    this.config = {
      feedRate: 0.05,
      killRate: 0.062,
      diffusionRateA: 0.2097,
      diffusionRateB: 0.105,
      width: 300,
      height: 300,
      scaling: 2,
      generationsPerSecond: 15,
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
    const run = function(prevT) {
      sim.draw();
      sim.update(prevT);
      const now = Date.now();
      const tdiff = now - prevT;
      setTimeout(run, t - tdiff, now);
    };

    run(Date.now());
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

  update(prevT) {
    if (this.state.running) {
      this.reaction.run();

      const now = Date.now();
      const tdiff = now - prevT;
      this.state.fps = (1000 / (now - prevT)).toFixed(2);
    } else {
      this.state.fps = 0;
    }
  }
}
