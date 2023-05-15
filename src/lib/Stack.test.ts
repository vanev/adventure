import Stack from "./Stack";

describe("Stack", () => {
  describe("#push", () => {
    it("adds an item to the stack and returns the size of the stack", () => {
      const subject = new Stack();

      const size = subject.push("first");

      expect(size).toEqual(1);
      expect(subject.peek()).toEqual("first");
    });
  });

  describe("#pop", () => {
    describe("when the stack is empty", () => {
      it("returns nothing", () => {
        const subject = new Stack();

        const item = subject.pop();

        expect(item).toEqual(undefined);
        expect(subject.size()).toEqual(0);
      });
    });

    describe("when the stack is not empty", () => {
      it("removes the most recently added item and returns it", () => {
        const subject = new Stack(["first", "second"]);

        const item = subject.pop();

        expect(item).toEqual("second");
        expect(subject.size()).toEqual(1);
        expect(subject.peek()).toEqual("first");
      });
    });
  });

  describe("#peek", () => {
    describe("when the stack is empty", () => {
      it("returns nothing", () => {
        const subject = new Stack();

        const item = subject.peek();

        expect(item).toEqual(undefined);
        expect(subject.size()).toEqual(0);
      });
    });

    describe("when the stack is not empty", () => {
      it("returns the most recently added item without removing it", () => {
        const subject = new Stack(["first", "second"]);

        const item = subject.peek();

        expect(item).toEqual("second");
        expect(subject.size()).toEqual(2);
      });
    });
  });

  describe("#isEmpty", () => {
    describe("when the stack is empty", () => {
      it("returns true", () => {
        const subject = new Stack();

        const actual = subject.isEmpty();

        expect(actual).toBe(true);
      });
    });

    describe("when the stack is not empty", () => {
      it("returns false", () => {
        const subject = new Stack(["first", "second"]);

        const actual = subject.isEmpty();

        expect(actual).toBe(false);
      });
    });
  });

  describe("#size", () => {
    it("returns the number of items in the stack", () => {
      const subject = new Stack(["first", "second", "third"]);

      const actual = subject.size();

      expect(actual).toBe(3);
    });
  });
});
