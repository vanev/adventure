import { Ord } from "fp-ts/lib/number";
import Range from "./Range";

describe("Range", () => {
  describe("#clamp", () => {
    describe("when the value is less than the bottom", () => {
      it("returns the bottom", () => {
        const range = new Range<number>(0, 10, Ord);

        const actual = range.clamp(-5);

        expect(actual).toEqual(0);
      });
    });

    describe("when the value is between the bottom and top", () => {
      it("returns the value", () => {
        const range = new Range<number>(0, 10, Ord);

        const actual = range.clamp(4);

        expect(actual).toEqual(4);
      });
    });

    describe("when the value is greater than the top", () => {
      it("returns the top", () => {
        const range = new Range<number>(0, 10, Ord);

        const actual = range.clamp(25);

        expect(actual).toEqual(10);
      });
    });
  });
});
