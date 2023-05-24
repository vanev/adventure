import Vector2 from "./Vector2";

export type Rectangle = {
  origin: Vector2;
  size: Vector2;
};

export const rectangle = (origin: Vector2, size: Vector2): Rectangle => ({
  origin,
  size,
});

export const corners = ({
  origin,
  size,
}: Rectangle): [Vector2, Vector2, Vector2, Vector2] => [
  origin,
  Vector2.from(origin.x + size.x - 1, origin.y),
  Vector2.from(origin.x, origin.y + size.y - 1),
  origin.add(size),
];

export const contains =
  ({ x, y }: Vector2) =>
  ({ origin, size }: Rectangle): boolean =>
    x >= origin.x &&
    x <= origin.x + size.x - 1 &&
    y >= origin.y &&
    y <= origin.y + size.y - 1;
