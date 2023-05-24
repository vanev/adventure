import { flow } from "fp-ts/lib/function";
import { Cardinal, Ordinal, Direction } from "./Direction";

const pool: Map<string, Vector2> = new Map();

const poolKey = (x: number, y: number) => `${x},${y}`;

export default class Vector2 {
  readonly x: number;
  readonly y: number;

  static from(x: number, y: number): Vector2 {
    const key = poolKey(x, y);

    const hit = pool.get(key);
    if (hit) return hit;

    const vec = new Vector2(x, y);
    pool.set(key, vec);

    return vec;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add = ({ x, y }: Vector2): Vector2 => Vector2.from(this.x + x, this.y + y);

  subtract = ({ x, y }: Vector2): Vector2 =>
    Vector2.from(this.x - x, this.y - y);

  magnitude = (): number =>
    Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

  distance = flow(this.subtract, this.magnitude);

  cardinalNeighbors = (): Record<Cardinal, Vector2> => ({
    North: this.add(cardinalVectors.North),
    East: this.add(cardinalVectors.East),
    South: this.add(cardinalVectors.South),
    West: this.add(cardinalVectors.West),
  });

  ordinalNeighbors = (): Record<Ordinal, Vector2> => ({
    Northeast: this.add(ordinalVectors.Northeast),
    Southeast: this.add(ordinalVectors.Southeast),
    Northwest: this.add(ordinalVectors.Northwest),
    Southwest: this.add(ordinalVectors.Southwest),
  });

  allNeighbors = (): Record<Direction, Vector2> => ({
    ...this.cardinalNeighbors(),
    ...this.ordinalNeighbors(),
  });
}

export const cardinalVectors: Record<Cardinal, Vector2> = {
  North: Vector2.from(0, -1),
  East: Vector2.from(1, 0),
  South: Vector2.from(0, 1),
  West: Vector2.from(-1, 0),
};

export const ordinalVectors: Record<Ordinal, Vector2> = {
  Northeast: cardinalVectors.North.add(cardinalVectors.East),
  Southeast: cardinalVectors.South.add(cardinalVectors.East),
  Southwest: cardinalVectors.South.add(cardinalVectors.West),
  Northwest: cardinalVectors.North.add(cardinalVectors.West),
};

export const allVectors: Record<Direction, Vector2> = {
  ...cardinalVectors,
  ...ordinalVectors,
};
