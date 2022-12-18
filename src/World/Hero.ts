import { Vector2 } from "../lib/Vector2";

export type Hero = {
  symbol: string;
  position: Vector2;
};

export const initial = (): Hero => ({
  symbol: "@",
  position: [0, 0],
});
