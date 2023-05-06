import { Duration } from "./lib/Duration";

const SMOOTHING = 0.95;

class Tick {
  delta: Duration = 0;
  now: number = performance.now();
  fps: number = 0;

  update = () => {
    const now = performance.now();

    this.delta = now - this.now;
    this.now = now;
    const fps = this.delta ? 1000 / this.delta : 60;
    this.fps = this.fps * SMOOTHING + fps * (1.0 - SMOOTHING);
  };
}

export default Tick;
