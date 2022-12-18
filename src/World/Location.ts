import * as Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
import { Terrain } from "./Terrain";

export type Location = {
  name: string;
  position: Vector2;
  symbol: string;
  terrain: Matrix.Matrix<Terrain>;
};
