import { Duration } from "../lib/Duration";

class Tick {
  sinceLast: Duration = 0;
  last: number = performance.now();
  fps: number = 0;

  update = () => {
    const now = performance.now();
    const delta = now - this.last;
    this.sinceLast = delta;
    this.last = now;
    const smoothing = 0.95;
    this.fps = this.fps * smoothing + delta * (1.0 - smoothing);
  };
}

export default Tick;
