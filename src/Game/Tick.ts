import { Duration } from "../lib/Duration";

export type Tick = {
  sinceLast: Duration;
  last: number;
  fps: number;
};

export const initial = (): Tick => ({
  sinceLast: 0,
  last: performance.now(),
  fps: 0,
});

export const update = (tick: Tick): Tick => {
  const next = { ...tick };
  const now = performance.now();
  const delta = now - next.last;
  next.sinceLast = delta;
  next.last = now;
  const smoothing = 0.95;
  next.fps = next.fps * smoothing + delta * (1.0 - smoothing);
  return next;
};
