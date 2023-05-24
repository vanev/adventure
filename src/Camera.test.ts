import Vector2 from "./lib/Vector2";
import Matrix from "./lib/Matrix";
import Camera from "./Camera";

describe("Camera", () => {
  it("works in the middle", () => {
    const subject = Matrix.fromSize(Vector2.from(10, 5)).fill(
      ({ x, y }) => `${x}${y}`,
    );

    const camera = new Camera({
      subject,
      size: Vector2.from(3, 3),
      focus: Vector2.from(2, 2),
    });

    const actual = Array.from(camera.values());

    const expected = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
    expect(actual).toEqual(expected);
  });

  it("works in the top left corner", () => {
    const subject = Matrix.fromSize(Vector2.from(10, 5)).fill(
      ({ x, y }) => `${x}${y}`,
    );

    const camera = new Camera({
      subject,
      size: Vector2.from(3, 3),
      focus: Vector2.from(0, 0),
    });

    const actual = Array.from(camera.values());

    const expected = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    expect(actual).toEqual(expected);
  });

  it("works in the bottom right corner", () => {
    const subject = Matrix.fromSize(Vector2.from(10, 5)).fill(
      ({ x, y }) => `${x}${y}`,
    );

    const camera = new Camera({
      subject,
      size: Vector2.from(3, 3),
      focus: Vector2.from(9, 4),
    });

    const actual = Array.from(camera.values());

    const expected = ["72", "73", "74", "82", "83", "84", "92", "93", "94"];
    expect(actual).toEqual(expected);
  });
});
