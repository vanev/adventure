import { pipe } from "fp-ts/lib/function";
import { fst } from "fp-ts/lib/Tuple";
import { Id, generateUnique } from "../lib/Id";
import Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
import { Place } from "./Place";
import { Terrain, grass } from "./Terrain";
import * as Hero from "./Hero";
import * as Clock from "./Clock";

export type { Terrain, Place };

export type World = {
  name: string;
  terrain: Matrix<Terrain>;
  locations: Map<Id, Place>;
  hero: Hero.Hero;
  clock: Clock.Clock;
};

export const initial = (name: string, size: Vector2): World => ({
  name,
  terrain: Matrix.fromSize<Terrain>(size),
  locations: new Map(),
  hero: Hero.initial(),
  clock: Clock.zero,
});

export const fillTerrain =
  (iterator: (point: Vector2) => Terrain) =>
  (world: World): World => {
    world.terrain = world.terrain.fill(iterator);
    return world;
  };

export const addPlace =
  (location: Place) =>
  (world: World): [World, Id] => {
    const id = generateUnique();
    world.locations.set(id, location);
    return [world, id];
  };

export const getPlace =
  (id: Id) =>
  (world: World): Place | undefined => {
    return world.locations.get(id);
  };

export const generate = (): World =>
  pipe(
    initial("Greenfield", Vector2.from(200, 200)),
    fillTerrain(grass),
    addPlace({
      name: "Martin's Cavern",
      position: Vector2.from(1, 1),
      symbol: "X",
      terrain: Matrix.fromSize<Terrain>(Vector2.from(40, 30)).fill(grass),
    }),
    fst,
    addPlace({
      name: "Ruins of Denerin",
      position: Vector2.from(10, 3),
      symbol: "X",
      terrain: Matrix.fromSize<Terrain>(Vector2.from(40, 30)).fill(grass),
    }),
    fst,
    addPlace({
      name: "Raelan Creek",
      position: Vector2.from(17, 23),
      symbol: "X",
      terrain: Matrix.fromSize<Terrain>(Vector2.from(40, 30)).fill(grass),
    }),
    fst,
    addPlace({
      name: "Really Very Long Namesvilletown",
      position: Vector2.from(45, 45),
      symbol: "X",
      terrain: Matrix.fromSize<Terrain>(Vector2.from(40, 30)).fill(grass),
    }),
    fst,
  );
