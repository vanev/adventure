import * as Tick from "./Tick";

export type State = {
  tick: Tick.Tick;
};

export const initial = (): State => ({
  tick: Tick.initial(),
});
