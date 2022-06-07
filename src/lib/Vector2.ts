import { flow } from "fp-ts/lib/function";
import { Cardinal, Ordinal, Direction } from "./Direction";

export type Vector2 = [number, number];

export const add = ([ax, ay]: Vector2, [bx, by]: Vector2): Vector2 => [
  ax + bx,
  ay + by,
];

export const subtract = ([ax, ay]: Vector2, [bx, by]: Vector2): Vector2 => [
  ax - bx,
  ay - by,
];

export const magnitude = ([x, y]: Vector2): number =>
  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

export const equals = ([ax, ay]: Vector2, [bx, by]: Vector2): boolean =>
  ax === bx && ay === by;

export const distance = flow(subtract, magnitude);

export const cardinalVectors: Record<Cardinal, Vector2> = {
  North: [0, -1],
  East: [0, 1],
  South: [1, 0],
  West: [-1, 0],
};

export const ordinalVectors: Record<Ordinal, Vector2> = {
  Northeast: add(cardinalVectors.North, cardinalVectors.East),
  Southeast: add(cardinalVectors.South, cardinalVectors.East),
  Southwest: add(cardinalVectors.South, cardinalVectors.West),
  Northwest: add(cardinalVectors.North, cardinalVectors.West),
};

export const allVectors: Record<Direction, Vector2> = {
  ...cardinalVectors,
  ...ordinalVectors,
};

export const cardinalNeighbors = (
  point: Vector2,
): Record<Cardinal, Vector2> => ({
  North: add(point, cardinalVectors.North),
  East: add(point, cardinalVectors.East),
  South: add(point, cardinalVectors.South),
  West: add(point, cardinalVectors.West),
});

export const ordinalNeighbors = (point: Vector2): Record<Ordinal, Vector2> => ({
  Northeast: add(point, ordinalVectors.Northeast),
  Southeast: add(point, ordinalVectors.Southeast),
  Northwest: add(point, ordinalVectors.Northwest),
  Southwest: add(point, ordinalVectors.Southwest),
});

export const allNeighbors = (point: Vector2): Record<Direction, Vector2> => ({
  ...cardinalNeighbors(point),
  ...ordinalNeighbors(point),
});
