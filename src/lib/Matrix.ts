import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Record";
import Vector2 from "./Vector2";
import { Cardinal, Ordinal, Direction } from "./Direction";

export default class Matrix<T> {
  readonly width: number;
  readonly height: number;
  private values: Array<T> = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  static fromSize = <V>({ x, y }: Vector2): Matrix<V> => new Matrix<V>(x, y);

  indexOf = ({ x, y }: Vector2): number => {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
    return x + y * this.width;
  };

  set = (point: Vector2, value: T): Matrix<T> => {
    const index = this.indexOf(point);

    if (index === -1) throw new Error(`${point} is out of bounds.`);

    this.values[this.indexOf(point)] = value;

    return this;
  };

  get = (point: Vector2): T | undefined => {
    const index = this.indexOf(point);

    if (index === -1) throw new Error(`${point} is out of bounds.`);

    return this.values[index];
  };

  *points(): Generator<Vector2> {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        yield Vector2.from(x, y);
      }
    }
  }

  *cells(): Generator<[Vector2, T | undefined]> {
    for (const point of this.points()) {
      yield [point, this.get(point)];
    }
  }

  fill = (iterator: (point: Vector2) => T): Matrix<T> => {
    for (const point of this.points()) {
      this.set(point, iterator(point));
    }

    return this;
  };

  cardinalNeighbors = (point: Vector2): Record<Cardinal, T | undefined> =>
    pipe(point.cardinalNeighbors(), map(this.get));

  ordinalNeighbors = (point: Vector2): Record<Ordinal, T | undefined> =>
    pipe(point.ordinalNeighbors(), map(this.get));

  allNeighbors = (point: Vector2): Record<Direction, T | undefined> =>
    pipe(point.allNeighbors(), map(this.get));
}
