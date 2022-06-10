import { flow } from "fp-ts/lib/function";
import { Cardinal, Ordinal, Direction } from "./Direction";

class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add = ({ x, y }: Vector2): Vector2 => new Vector2(this.x + x, this.y + y);

  subtract = ({ x, y }: Vector2): Vector2 =>
    new Vector2(this.x - x, this.y - y);

  magnitude = (): number =>
    Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

  equals = ({ x, y }: Vector2): boolean => this.x === x && this.y === y;

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
  North: new Vector2(0, -1),
  East: new Vector2(1, 0),
  South: new Vector2(0, 1),
  West: new Vector2(-1, 0),
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

export default Vector2;
