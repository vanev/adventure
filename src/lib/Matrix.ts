import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Record";
import Vector2, {
  cardinalNeighbors,
  ordinalNeighbors,
  allNeighbors,
} from "./Vector2";
import { Cardinal, Ordinal, Direction } from "./Direction";

class Matrix<T> {
  private width: number;
  private height: number;
  private _cells: Array<T> = [];

  constructor([x, y]: Vector2) {
    this.width = x;
    this.height = y;
  }

  private _indexOf = ([x, y]: Vector2) => {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
    return x + y * this.width;
  };

  set = (point: Vector2, value: T): Matrix<T> => {
    this._cells[this._indexOf(point)] = value;
    return this;
  };

  get = (point: Vector2): T | undefined => this._cells[this._indexOf(point)];

  *points(): Generator<Vector2> {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        yield [x, y];
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

  cardinalNeighbors = (point: Vector2): Record<Cardinal, T | void> =>
    pipe(
      point,
      cardinalNeighbors,
      map((neighbor) => this.get(neighbor)),
    );

  ordinalNeighbors = (point: Vector2): Record<Ordinal, T | void> =>
    pipe(
      point,
      ordinalNeighbors,
      map((neighbor) => this.get(neighbor)),
    );

  allNeighbors = (point: Vector2): Record<Direction, T | void> =>
    pipe(
      point,
      allNeighbors,
      map((neighbor) => this.get(neighbor)),
    );
}

export default Matrix;
