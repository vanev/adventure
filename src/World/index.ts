import { Id, generateUnique } from "../lib/Id";
import Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
import { Location } from "./Location";
import { Terrain, grass } from "./Terrain";
import Hero from "./Hero";
import Clock from "./Clock";

export type { Terrain, Location, Hero, Clock };

class World {
  name: string;
  terrain: Matrix<Terrain>;
  locations: Map<Id, Location> = new Map();
  hero: Hero = new Hero();
  clock: Clock = new Clock();

  constructor(name: string, size: Vector2) {
    this.name = name;
    this.terrain = new Matrix(size);
  }

  fillTerrain = (iterator: (point: Vector2) => Terrain) => {
    this.terrain.fill(iterator);
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
  const world = new World("Greenfield", new Vector2(40, 30));

  world.fillTerrain(() => grass);

  world.addLocation({
    name: "Martin's Cavern",
    position: new Vector2(4, 6),
    symbol: "X",
    terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
  });
  world.addLocation({
    name: "Ruins of Denerin",
    position: new Vector2(10, 3),
    symbol: "X",
    terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
  });
  world.addLocation({
    name: "Raelan Creek",
    position: new Vector2(17, 23),
    symbol: "X",
    terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
  });
  world.addLocation({
    name: "Really Very Long Namesvilletown",
    position: new Vector2(14, 18),
    symbol: "X",
    terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
  });

  return world;
};

export default World;
