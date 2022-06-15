import { flow } from "fp-ts/lib/function";
import { Cardinal, Ordinal, Direction } from "./Direction";

type Vector2 = [number, number];

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

export const cardinalNeighbors = (
  vector: Vector2,
): Record<Cardinal, Vector2> => ({
  North: add(vector, cardinalVectors.North),
  East: add(vector, cardinalVectors.East),
  South: add(vector, cardinalVectors.South),
  West: add(vector, cardinalVectors.West),
});

export const ordinalNeighbors = (
  vector: Vector2,
): Record<Ordinal, Vector2> => ({
  Northeast: add(vector, ordinalVectors.Northeast),
  Southeast: add(vector, ordinalVectors.Southeast),
  Northwest: add(vector, ordinalVectors.Northwest),
  Southwest: add(vector, ordinalVectors.Southwest),
});

export const allNeighbors = (vector: Vector2): Record<Direction, Vector2> => ({
  ...cardinalNeighbors(vector),
  ...ordinalNeighbors(vector),
});

export const cardinalVectors: Record<Cardinal, Vector2> = {
  North: [0, -1],
  East: [1, 0],
  South: [0, 1],
  West: [-1, 0],
};

export const ordinalVectors: Record<Ordinal, Vector2> = {
  Northeast: add(cardinalVectors.North, cardinalVectors.East),
  Southeast: add(cardinalVectors.North, cardinalVectors.East),
  Southwest: add(cardinalVectors.North, cardinalVectors.West),
  Northwest: add(cardinalVectors.North, cardinalVectors.West),
};

export const allVectors: Record<Direction, Vector2> = {
  ...cardinalVectors,
  ...ordinalVectors,
};

export const toKey = ([x, y]: Vector2): string => `${x},${y}`;

export const fromKey = (key: string): Vector2 => {
  const [x, y] = key.split(",");
  return [parseInt(x, 10), parseInt(y, 10)];
};

export default Vector2;
