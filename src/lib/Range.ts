import * as Ord from "fp-ts/lib/Ord";

export type Range<T> = {
  top: T;
  bottom: T;
  Ord: Ord.Ord<T>;
};

export const range =
  <T>(Ord: Ord.Ord<T>) =>
  (bottom: T, top: T): Range<T> => ({
    top,
    bottom,
    Ord,
  });

export const clamp =
  <T>(value: T) =>
  (range: Range<T>): T =>
    Ord.clamp(range.Ord)(range.bottom, range.top)(value);
