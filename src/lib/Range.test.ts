import { Ord } from "fp-ts/lib/number";
import { range, clamp } from "./Range";

describe("Range", () => {
  describe(".clamp", () => {
    describe("when the value is less than the bottom", () => {
      it("returns the bottom", () => {
        const subject = range(Ord)(0, 10);

        const actual = clamp(-5)(subject);

        expect(actual).toEqual(0);
      });
    });

    describe("when the value is between the bottom and top", () => {
      it("returns the value", () => {
        const subject = range(Ord)(0, 10);

        const actual = clamp(4)(subject);

        expect(actual).toEqual(4);
      });
    });

    describe("when the value is greater than the top", () => {
      it("returns the top", () => {
        const subject = range(Ord)(0, 10);

        const actual = clamp(25)(subject);

        expect(actual).toEqual(10);
      });
    });
  });
});
