import { Ord as numberOrd } from "fp-ts/lib/number";
import { Ord, clamp } from "fp-ts/lib/Ord";

export default class Range<T> {
  private top: T;
  private bottom: T;
  private Ord: Ord<T>;

  constructor(bottom: T, top: T, Ord: Ord<T>) {
    this.top = top;
    this.bottom = bottom;
    this.Ord = Ord;
  }

  clamp = (value: T): T => {
    return clamp(this.Ord)(this.bottom, this.top)(value);
  };
}

export class NumberRange extends Range<number> {
  constructor(bottom: number, top: number) {
    super(bottom, top, numberOrd);
  }
}
