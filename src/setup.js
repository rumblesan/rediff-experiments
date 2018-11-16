const canvas = document.getElementById('display');
const sim = new Simulation(canvas);
sim.randomise();

window.addEventListener('keydown', function keydown(e) {
  const keycode = e.which || window.event.keycode;
  // 32 = space key
  if (keycode == 32) {
    sim.togglePause();
    e.preventDefault();
  }
  // 82 = r key
  if (keycode == 82) {
    sim.randomise();
    e.preventDefault();
  }
});

sim.start();
