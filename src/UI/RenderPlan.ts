import Color from "../Color";

type RenderPlan = {
  content: string;
  background: Color;
  foreground: Color;
};

export const removePlan: RenderPlan = {
  content: "",
  foreground: Color.DarkBlack,
  background: Color.DarkBlack,
};

export const equals = (a: RenderPlan, b: RenderPlan): boolean =>
  a.content === b.content &&
  a.background === b.background &&
  a.foreground === b.foreground;

export default RenderPlan;
