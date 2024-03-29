import Vector2 from "../lib/Vector2";

export type Hero = {
  symbol: string;
  position: Vector2;
};

export const initial = (): Hero => ({
  symbol: "guy1",
  position: Vector2.from(0, 0),
});
