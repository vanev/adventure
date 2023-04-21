import { Duration } from "./lib/Duration";

const SMOOTHING = 0.95;

class Tick {
  delta: Duration = 0;
  last: number = performance.now();
  fps: number = 0;

  update = () => {
    const now = performance.now();

    this.delta = now - this.last;
    this.last = now;
    this.fps = this.fps * SMOOTHING + this.delta * (1.0 - SMOOTHING);
  };
}

export default Tick;
