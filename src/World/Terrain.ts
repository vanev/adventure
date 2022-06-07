import Color from "../Color";

export type Terrain = {
  symbol: string;
  foregroundColor: Color;
  backgroundColor: Color;
};

export const grass: Terrain = {
  symbol: ".",
  foregroundColor: Color.MidGreen,
  backgroundColor: Color.DarkGreen,
};
