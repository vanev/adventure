import * as Number from "fp-ts/lib/number";
import * as Range from "./Range";

export const range = (bottom: number, top: number): Range.Range<number> =>
  Range.range(Number.Ord)(bottom, top);
