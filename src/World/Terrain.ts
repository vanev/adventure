import Color from "../Color";

export type Terrain = {
  key: string;
  foreground: Color;
  background: Color;
};

export const grass: Terrain = {
  key: ".",
  foreground: Color.MidGreen,
  background: Color.DarkGreen,
};
