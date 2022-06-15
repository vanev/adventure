import Color from "../Color";

type RenderPlan = {
  key: string;
  // foreground: Color;
  background: Color;
};

export const removePlan: RenderPlan = {
  key: "blank",
  // foreground: Color.DarkBlack,
  background: Color.DarkBlack,
};

export const equals = (a: RenderPlan, b: RenderPlan): boolean =>
  a.key === b.key &&
  // a.foreground === b.foreground &&
  a.background === b.background;

export default RenderPlan;
