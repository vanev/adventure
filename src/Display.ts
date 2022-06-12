import * as ROT from "rot-js";
import Color from "./Color";

export type Display = ROT.Display;

ROT.Display.Rect.cache = true;

const DISPLAY_CONFIG = {
  width: 100,
  height: 40,
  fontSize: 16,
  fontFamily: "Fira Code, monospace",
  bg: Color.DarkBlack,
  fg: Color.LightWhite,
};

export const initialize = (parent: HTMLElement): Display => {
  const display = new ROT.Display(DISPLAY_CONFIG);

  const container = display.getContainer();
  if (!container) throw new Error("Display Container Element Not Found");

  parent.appendChild(container);

  return display;
};
