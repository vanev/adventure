import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Record";
import Vector2 from "./Vector2";
import { Cardinal, Ordinal, Direction } from "./Direction";

class Matrix<T> {
  width: number;
  height: number;
  cells: Array<T> = [];

  constructor({ x, y }: Vector2) {
    this.width = x;
    this.height = y;
  }

  private _indexOf = ({ x, y }: Vector2) => x + y * this.width;

  set = (point: Vector2, value: T): Matrix<T> => {
    this.cells[this._indexOf(point)] = value;
    return this;
  };

  get = (point: Vector2) => this.cells[this._indexOf(point)];

  fill = (iterator: (point: Vector2) => T): Matrix<T> => {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const point: Vector2 = new Vector2(x, y);
        this.set(point, iterator(point));
      }
    }
    return this;
  };

  cardinalNeighbors = (point: Vector2): Record<Cardinal, T | void> =>
    pipe(
      point.cardinalNeighbors(),
      map((neighbor) => this.get(neighbor)),
    );

  ordinalNeighbors = (point: Vector2): Record<Ordinal, T | void> =>
    pipe(
      point.ordinalNeighbors(),
      map((neighbor) => this.get(neighbor)),
    );

  allNeighbors = (point: Vector2): Record<Direction, T | void> =>
    pipe(
      point.allNeighbors(),
      map((neighbor) => this.get(neighbor)),
    );

  forEach = (iterator: (value: T, point: Vector2) => void): Matrix<T> => {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const point: Vector2 = new Vector2(x, y);

        const value = this.get(point);
        if (!value) throw new Error("Value not found!");

        iterator(value, point);
      }
    }
    return this;
  };
}

export default Matrix;
