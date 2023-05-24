import Vector2 from "./Vector2";

describe("Vector2", () => {
  describe(".from", () => {
    it("enables value comparisons", () => {
      const a = Vector2.from(0, 0);
      const b = Vector2.from(0, 0);

      expect(a).toBe(b);
    });
  });

  describe("#add", () => {
    it("returns a Vector2 of the sum", () => {
      const subject = Vector2.from(1, 1);
      const other = Vector2.from(2, 1);

      const actual = subject.add(other);

      const expected = Vector2.from(3, 2);
      expect(actual).toBe(expected);
    });
  });

  describe("#subtract", () => {
    it("returns a Vector2 of the difference", () => {
      const subject = Vector2.from(3, 3);
      const other = Vector2.from(2, 1);

      const actual = subject.subtract(other);

      const expected = Vector2.from(1, 2);
      expect(actual).toBe(expected);
    });
  });

  describe("#magnitude", () => {
    it("returns the magnitude of the vector", () => {
      const subject = Vector2.from(3, 4);

      const actual = subject.magnitude();

      const expected = 5;
      expect(actual).toBe(expected);
    });
  });

  describe("#distance", () => {
    it("returns the distance between two vectors", () => {
      const subject = Vector2.from(5, 0);
      const other = Vector2.from(10, 0);

      const actual = subject.distance(other);

      const expected = 5;
      expect(actual).toBe(expected);
    });
  });

  describe("#cardinalNeighbors", () => {
    it("returns the cardinal neighbors", () => {
      const subject = Vector2.from(4, 7);

      const actual = subject.cardinalNeighbors();

      expect(actual.North).toBe(Vector2.from(4, 6));
      expect(actual.South).toBe(Vector2.from(4, 8));
      expect(actual.East).toBe(Vector2.from(5, 7));
      expect(actual.West).toBe(Vector2.from(3, 7));
    });
  });

  describe("#ordinalNeighbors", () => {
    it("returns the ordinal neighbors", () => {
      const subject = Vector2.from(4, 7);

      const actual = subject.ordinalNeighbors();

      expect(actual.Northeast).toBe(Vector2.from(5, 6));
      expect(actual.Southeast).toBe(Vector2.from(5, 8));
      expect(actual.Southwest).toBe(Vector2.from(3, 8));
      expect(actual.Northwest).toBe(Vector2.from(3, 6));
    });
  });

  describe("#allNeighbors", () => {
    it("returns all neighbors", () => {
      const subject = Vector2.from(4, 7);

      const actual = subject.allNeighbors();

      expect(actual.North).toBe(Vector2.from(4, 6));
      expect(actual.South).toBe(Vector2.from(4, 8));
      expect(actual.East).toBe(Vector2.from(5, 7));
      expect(actual.West).toBe(Vector2.from(3, 7));
      expect(actual.Northeast).toBe(Vector2.from(5, 6));
      expect(actual.Southeast).toBe(Vector2.from(5, 8));
      expect(actual.Southwest).toBe(Vector2.from(3, 8));
      expect(actual.Northwest).toBe(Vector2.from(3, 6));
    });
  });
});
