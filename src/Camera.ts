import Matrix from "./lib/Matrix";
import { NumberRange } from "./lib/Range";
import Rectangle from "./lib/Rectangle";
import Vector2, { add, subtract } from "./lib/Vector2";

export type Config<T> = {
  subject: Matrix<T>;
  size: Vector2;
  focus: Vector2;
};

/**
 * An Camera provides a view into a subject matrix around a focal point (focus).
 */
export default class Camera<T> {
  private subject: Matrix<T>;
  private frame: Rectangle;

  constructor({ subject, size, focus }: Config<T>) {
    this.subject = subject;

    const [width, height] = size;
    const [focusX, focusY] = focus;

    const originX = Math.ceil(focusX - (width - 1) / 2);
    const originY = Math.ceil(focusY - (height - 1) / 2);

    const rangeX = new NumberRange(0, this.subject.width - width);
    const rangeY = new NumberRange(0, this.subject.height - height);

    const origin: Vector2 = [rangeX.clamp(originX), rangeY.clamp(originY)];

    this.frame = new Rectangle(origin, size);
  }

  /**
   * Returns whether a given point in the subject is in the camera's view.
   */
  isInView = (subjectPoint: Vector2): boolean =>
    this.frame.contains(subjectPoint);

  /**
   * Converts a point in the subject to it's corresponding point in the camera.
   */
  toCameraPoint = (subjectPoint: Vector2): Vector2 =>
    subtract(subjectPoint, this.frame.origin);

  /**
   * Converts a point in the camera to it's corresponding point in the subject.
   */
  toSubjectPoint = (cameraPoint: Vector2): Vector2 =>
    add(this.frame.origin, cameraPoint);

  /**
   * Yields each point in the camera's view (not the corresponding points in the subject).
   */
  *points(): Generator<Vector2> {
    const [width, height] = this.frame.size;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        yield [x, y];
      }
    }
  }

  *values(): Generator<T | undefined> {
    for (let point of this.points()) {
      const value = this.subject.get(this.toSubjectPoint(point));

      yield value;
    }
  }

  /**
   * Yields each point in the camera's view and the value of the corresponding cell in the subject.
   */
  *cells(): Generator<[Vector2, T | undefined]> {
    for (let point of this.points()) {
      const value = this.subject.get(this.toSubjectPoint(point));

      yield [point, value];
    }
  }
}
