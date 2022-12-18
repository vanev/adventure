import { pipe } from "fp-ts/lib/function";
import { fst } from "fp-ts/lib/Tuple";
import { Id, generateUnique } from "../lib/Id";
import * as Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
import { Location } from "./Location";
import { Terrain, grass } from "./Terrain";
import * as Hero from "./Hero";
import * as Clock from "./Clock";

export type { Terrain, Location };

export type World = {
  name: string;
  terrain: Matrix.Matrix<Terrain>;
  locations: Map<Id, Location>;
  hero: Hero.Hero;
  clock: Clock.Clock;
};

export const initial = (name: string, size: Vector2): World => ({
  name,
  terrain: Matrix.fromSize(size),
  locations: new Map(),
  hero: Hero.initial(),
  clock: Clock.zero,
});

export const fillTerrain =
  (iterator: (point: Vector2) => Terrain) =>
  (world: World): World => {
    world.terrain = Matrix.fill(iterator)(world.terrain);
    return world;
  };

export const addLocation =
  (location: Location) =>
  (world: World): [World, Id] => {
    const id = generateUnique();
    world.locations.set(id, location);
    return [world, id];
  };

export const getLocation =
  (id: Id) =>
  (world: World): Location | undefined => {
    return world.locations.get(id);
  };

export const generate = (): World =>
  pipe(
    initial("Greenfield", [200, 200]),
    fillTerrain(() => grass),
    addLocation({
      name: "Martin's Cavern",
      position: [1, 1],
      symbol: "X",
      terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
    }),
    fst,
    addLocation({
      name: "Ruins of Denerin",
      position: [10, 3],
      symbol: "X",
      terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
    }),
    fst,
    addLocation({
      name: "Raelan Creek",
      position: [17, 23],
      symbol: "X",
      terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
    }),
    fst,
    addLocation({
      name: "Really Very Long Namesvilletown",
      position: [45, 45],
      symbol: "X",
      terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
    }),
    fst,
  );
