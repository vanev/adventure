import Tick from "./Tick";
import Keyboard from "./Keyboard";

export type State = {
  tick: Tick;
  keyboard: Keyboard;
};

export const initial: State = {
  tick: new Tick(),
  keyboard: new Keyboard(),
};
