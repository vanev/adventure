import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import NonEmptyStack from "./lib/NonEmptyStack";
import Screen from "./Screen";

export default class ScreenStack extends NonEmptyStack<Screen> {
  constructor(screens: NonEmptyArray<Screen>) {
    super(screens);
    const screen = this.peek();
    screen.enter();
  }

  push(next: Screen): number {
    const previous = this.peek();
    const size = super.push(next);

    previous?.leave();
    next.enter();

    return size;
  }

  pop(): Screen {
    const previous = super.pop();
    const next = this.peek();

    previous.leave();
    next.enter();

    return previous;
  }

  replace(next: Screen): Screen {
    const previous = super.pop();
    super.push(next);

    previous.leave();
    next.enter();

    return previous;
  }
}
