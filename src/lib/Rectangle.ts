import Vector2, { add } from "./Vector2";

class Rectangle {
  origin: Vector2;
  size: Vector2;

  constructor(origin: Vector2, size: Vector2) {
    this.origin = origin;
    this.size = size;
  }

  corners = (): [Vector2, Vector2, Vector2, Vector2] => [
    this.origin,
    [this.origin[0] + this.size[0] - 1, this.origin[1]],
    [this.origin[0], this.origin[1] + this.size[1] - 1],
    add(this.origin, this.size),
  ];

  contains = ([x, y]: Vector2): boolean =>
    x >= this.origin[0] &&
    x <= this.origin[0] + this.size[0] - 1 &&
    y >= this.origin[1] &&
    y <= this.origin[1] + this.size[1] - 1;
}

export default Rectangle;
