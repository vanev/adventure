import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Record";
import {
  cardinalNeighbors,
  ordinalNeighbors,
  allNeighbors,
  Vector2,
} from "./Vector2";
import { Cardinal, Ordinal, Direction } from "./Direction";

export type Matrix<T> = {
  width: number;
  height: number;
  cells: Array<T>;
};

export const empty = <T>([x, y]: Vector2): Matrix<T> => ({
  width: x,
  height: y,
  cells: [],
});

export const fill =
  <T>(f: (point: Vector2) => T) =>
  (matrix: Matrix<T>): Matrix<T> => {
    for (let x = 0; x < matrix.width; x++) {
      for (let y = 0; y < matrix.height; y++) {
        const point: Vector2 = [x, y];
        set(point)(f(point))(matrix);
      }
    }
    return matrix;
  };

export const set =
  ([x, y]: Vector2) =>
  <T>(value: T) =>
  (matrix: Matrix<T>): Matrix<T> => {
    matrix.cells[x + y * matrix.width] = value;
    return matrix;
  };

export const get =
  ([x, y]: Vector2) =>
  <T>(matrix: Matrix<T>): T | void => {
    return matrix.cells[x + y * matrix.width];
  };

export const getCardinalNeighbors =
  (point: Vector2) =>
  <T>(matrix: Matrix<T>): Record<Cardinal, T | void> =>
    pipe(
      point,
      cardinalNeighbors,
      map((neighbor) => get(neighbor)(matrix)),
    );

export const getOrdinalNeighbors =
  (point: Vector2) =>
  <T>(matrix: Matrix<T>): Record<Ordinal, T | void> =>
    pipe(
      point,
      ordinalNeighbors,
      map((neighbor) => get(neighbor)(matrix)),
    );

export const getAllNeighbors =
  (point: Vector2) =>
  <T>(matrix: Matrix<T>): Record<Direction, T | void> =>
    pipe(
      point,
      allNeighbors,
      map((neighbor) => get(neighbor)(matrix)),
    );

export const forEach =
  <T>(iterator: (value: T, point: Vector2) => void) =>
  (matrix: Matrix<T>) => {
    for (let x = 0; x < matrix.width; x++) {
      for (let y = 0; y < matrix.height; y++) {
        const point: Vector2 = [x, y];

        const value = get(point)(matrix);
        if (!value) throw new Error("Value not found!");

        iterator(value, point);
      }
    }
  };
