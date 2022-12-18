import * as Vector2 from "./Vector2";

export type Rectangle = {
  origin: Vector2.Vector2;
  size: Vector2.Vector2;
};

export const rectangle = (
  origin: Vector2.Vector2,
  size: Vector2.Vector2,
): Rectangle => ({ origin, size });

export const corners = ({
  origin,
  size,
}: Rectangle): [
  Vector2.Vector2,
  Vector2.Vector2,
  Vector2.Vector2,
  Vector2.Vector2,
] => [
  origin,
  [origin[0] + size[0] - 1, origin[1]],
  [origin[0], origin[1] + size[1] - 1],
  Vector2.add(origin, size),
];

export const contains =
  ([x, y]: Vector2.Vector2) =>
  ({ origin, size }: Rectangle): boolean =>
    x >= origin[0] &&
    x <= origin[0] + size[0] - 1 &&
    y >= origin[1] &&
    y <= origin[1] + size[1] - 1;
