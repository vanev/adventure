import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Record";
import Vector2 from "./Vector2";
import { Cardinal, Ordinal, Direction } from "./Direction";

export type Matrix<T> = {
  width: number;
  height: number;
  cells: Array<T>;
};

export const fromSize = <T>({ x, y }: Vector2): Matrix<T> => ({
  width: x,
  height: y,
  cells: [],
});

const indexOf =
  ({ x, y }: Vector2) =>
  <T>(matrix: Matrix<T>) => {
    if (x < 0 || x >= matrix.width || y < 0 || y >= matrix.height) return -1;
    return x + y * matrix.width;
  };

export const set =
  <T>(point: Vector2, value: T) =>
  (matrix: Matrix<T>): Matrix<T> => {
    matrix.cells[indexOf(point)(matrix)] = value;
    return matrix;
  };

export const get =
  (point: Vector2) =>
  <T>(matrix: Matrix<T>): T | undefined =>
    matrix.cells[indexOf(point)(matrix)];

export function* points<T>(matrix: Matrix<T>): Generator<Vector2> {
  for (let x = 0; x < matrix.width; x++) {
    for (let y = 0; y < matrix.height; y++) {
      yield Vector2.from(x, y);
    }
  }
}

export function* cells<T>(
  matrix: Matrix<T>,
): Generator<[Vector2, T | undefined]> {
  for (const point of points(matrix)) {
    yield [point, get(point)(matrix)];
  }
}

export const fill =
  <T>(iterator: (point: Vector2) => T) =>
  (matrix: Matrix<T>): Matrix<T> => {
    for (const point of points(matrix)) {
      set(point, iterator(point))(matrix);
    }
    return matrix;
  };

export const cardinalNeighbors =
  <T>(point: Vector2) =>
  (matrix: Matrix<T>): Record<Cardinal, T | undefined> =>
    pipe(
      point.cardinalNeighbors(),
      map((neighbor) => get(neighbor)(matrix)),
    );

export const ordinalNeighbors =
  <T>(point: Vector2) =>
  (matrix: Matrix<T>): Record<Ordinal, T | undefined> =>
    pipe(
      point.ordinalNeighbors(),
      map((neighbor) => get(neighbor)(matrix)),
    );

export const allNeighbors =
  <T>(point: Vector2) =>
  (matrix: Matrix<T>): Record<Direction, T | undefined> =>
    pipe(
      point.allNeighbors(),
      map((neighbor) => get(neighbor)(matrix)),
    );
