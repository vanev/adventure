import Tick from "./Tick";

export type State = {
  tick: Tick;
};

export const initial: State = {
  tick: new Tick(),
};
