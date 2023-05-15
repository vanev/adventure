import NonEmptyStack from "./NonEmptyStack";

describe("NonEmptyStack", () => {
  describe("#push", () => {
    it("adds an item to the stack and returns the size of the stack", () => {
      const subject = new NonEmptyStack(["first"]);

      const size = subject.push("second");

      expect(size).toEqual(2);
      expect(subject.peek()).toEqual("second");
    });
  });

  describe("#pop", () => {
    describe("when there is one item", () => {
      it("throws an error", () => {
        const subject = new NonEmptyStack(["first"]);

        expect(() => subject.pop()).toThrow();
      });
    });

    describe("when there is more than one item", () => {
      it("removes the most recently added item and returns it", () => {
        const subject = new NonEmptyStack(["first", "second"]);

        const item = subject.pop();

        expect(item).toEqual("second");
        expect(subject.size()).toEqual(1);
        expect(subject.peek()).toEqual("first");
      });
    });
  });

  describe("#peek", () => {
    it("returns the most recently added item without removing it", () => {
      const subject = new NonEmptyStack(["first", "second"]);

      const item = subject.peek();

      expect(item).toEqual("second");
      expect(subject.size()).toEqual(2);
    });
  });

  describe("#isEmpty", () => {
    it("returns false", () => {
      const subject = new NonEmptyStack(["first", "second"]);

      const actual = subject.isEmpty();

      expect(actual).toBe(false);
    });
  });

  describe("#size", () => {
    it("returns the number of items in the stack", () => {
      const subject = new NonEmptyStack(["first", "second", "third"]);

      const actual = subject.size();

      expect(actual).toBe(3);
    });
  });
});
