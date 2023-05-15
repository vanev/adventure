import Application from "./Application";
import Screen from "./Screen";
import ScreenStack from "./ScreenStack";

class FakeScreen extends Screen {
  constructor() {
    super({} as Application);
  }

  enter = jest.fn();
  leave = jest.fn();
}

describe("ScreenStack", () => {
  describe("#constructor", () => {
    it("calls the enter lifecycle method on *only* the head of the stack", () => {
      const first = new FakeScreen();
      const second = new FakeScreen();

      const subject = new ScreenStack([first, second]);

      expect(first.enter).not.toHaveBeenCalled();
      expect(second.enter).toHaveBeenCalled();
    });
  });

  describe("#push", () => {
    it("adds a screen to the stack, calls the lifecycle methods, and returns the size of the stack", () => {
      const first = new FakeScreen();
      const second = new FakeScreen();

      const subject = new ScreenStack([first]);

      const size = subject.push(second);

      expect(size).toBe(2);
      expect(subject.peek()).toBe(second);
      expect(first.leave).toHaveBeenCalled();
      expect(second.enter).toHaveBeenCalled();
    });
  });

  describe("#pop", () => {
    describe("when there is one item", () => {
      it("throws an error", () => {
        const first = new FakeScreen();

        const subject = new ScreenStack([first]);

        expect(() => subject.pop()).toThrow();
      });
    });

    describe("when there is more than one item", () => {
      it("removes the most recently added item, calls the lifecycle methods, and returns it", () => {
        const first = new FakeScreen();
        const second = new FakeScreen();

        const subject = new ScreenStack([first, second]);

        const item = subject.pop();

        expect(item).toBe(second);
        expect(subject.size()).toBe(1);
        expect(subject.peek()).toBe(first);
        expect(second.leave).toHaveBeenCalled();
        expect(first.enter).toHaveBeenCalled();
      });
    });
  });

  describe("#peek", () => {
    it("returns the most recently added item without removing it", () => {
      const first = new FakeScreen();
      const second = new FakeScreen();
      const subject = new ScreenStack([first, second]);

      const item = subject.peek();

      expect(item).toBe(second);
      expect(subject.size()).toBe(2);
    });
  });

  describe("#isEmpty", () => {
    it("returns false", () => {
      const first = new FakeScreen();
      const second = new FakeScreen();
      const subject = new ScreenStack([first, second]);

      const actual = subject.isEmpty();

      expect(actual).toBe(false);
    });
  });

  describe("#size", () => {
    it("returns the number of items in the stack", () => {
      const first = new FakeScreen();
      const second = new FakeScreen();
      const third = new FakeScreen();
      const subject = new ScreenStack([first, second, third]);

      const actual = subject.size();

      expect(actual).toBe(3);
    });
  });

  describe("#replace", () => {
    it("replaces the most recently added item, calls the lifecycle methods, and returns the replaced item", () => {
      const first = new FakeScreen();
      const second = new FakeScreen();
      const third = new FakeScreen();
      const subject = new ScreenStack([first, second]);

      const replaced = subject.replace(third);

      expect(replaced).toBe(second);
      expect(subject.size()).toBe(2);
      expect(subject.peek()).toBe(third);
      expect(second.leave).toHaveBeenCalled();
      expect(third.enter).toHaveBeenCalled();
      // NOTE: For a moment, after second has been popped and before third has been pushed, first is the head of the stack. We *do not* want the lifecycle methods to be called on first!
      expect(first.enter).not.toHaveBeenCalled();
      expect(first.leave).not.toHaveBeenCalled();
    });
  });
});
