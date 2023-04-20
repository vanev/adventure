import Color from "../Color";

export type Terrain = {
  key: string;
  foreground: Color;
  background: Color;
};

const keys = [
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "grass1",
  "grass2",
  "grass3",
];

export const grass = (): Terrain => ({
  key: keys[Math.floor(Math.random() * keys.length)],
  foreground: Color.MidGreen,
  background: Color.MidBlack,
});
