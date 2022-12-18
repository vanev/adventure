import { Id, generateUnique } from "../lib/Id";
import * as Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
import { Location } from "./Location";
import { Terrain, grass } from "./Terrain";
import Hero from "./Hero";
import * as Clock from "./Clock";

export type { Terrain, Location, Hero };

class World {
  name: string;
  terrain: Matrix.Matrix<Terrain>;
  locations: Map<Id, Location> = new Map();
  hero: Hero = new Hero();
  clock: Clock.Clock = Clock.zero;

  constructor(name: string, size: Vector2) {
    this.name = name;
    this.terrain = Matrix.fromSize(size);
  }

  fillTerrain = (iterator: (point: Vector2) => Terrain) => {
    this.terrain = Matrix.fill(iterator)(this.terrain);
  };

  addLocation = (location: Location): Id => {
    const id = generateUnique();
    this.locations.set(id, location);
    return id;
  };

  getLocation = (id: Id): Location | void => {
    return this.locations.get(id);
  };
}

export const generate = (): World => {
  const world = new World("Greenfield", [200, 200]);

  world.fillTerrain(() => grass);

  world.addLocation({
    name: "Martin's Cavern",
    position: [1, 1],
    symbol: "X",
    terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
  });
  world.addLocation({
    name: "Ruins of Denerin",
    position: [10, 3],
    symbol: "X",
    terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
  });
  world.addLocation({
    name: "Raelan Creek",
    position: [17, 23],
    symbol: "X",
    terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
  });
  world.addLocation({
    name: "Really Very Long Namesvilletown",
    position: [45, 45],
    symbol: "X",
    terrain: Matrix.fill(() => grass)(Matrix.fromSize([40, 30])),
  });

  return world;
};

export default World;
