import { Id, generateUnique } from "../lib/Id";
import Matrix from "../lib/Matrix";
import { Location } from "./Location";
import { Terrain, grass } from "./Terrain";
import { Hero } from "./Hero";
import { Clock, initial as initialClock } from "./Clock";

export type { Terrain, Location, Hero, Clock };

export type World = {
  name: string;
  locations: Map<Id, Location>;
  terrain: Matrix<Terrain>;
  hero: Hero;
  clock: Clock;
};

export const generate = (): World => ({
  name: "Greenfield",
  locations: new Map([
    [
      generateUnique(),
      {
        name: "Martin's Cavern",
        position: [4, 6],
        symbol: "X",
        terrain: new Matrix<Terrain>([40, 30]).fill(() => grass),
      },
    ],
    [
      generateUnique(),
      {
        name: "Ruins of Denerin",
        position: [10, 3],
        symbol: "X",
        terrain: new Matrix<Terrain>([40, 30]).fill(() => grass),
      },
    ],
    [
      generateUnique(),
      {
        name: "Raelan Creek",
        position: [17, 23],
        symbol: "X",
        terrain: new Matrix<Terrain>([40, 30]).fill(() => grass),
      },
    ],
    [
      generateUnique(),
      {
        name: "Really Very Long Namesvilletown",
        position: [14, 18],
        symbol: "X",
        terrain: new Matrix<Terrain>([40, 30]).fill(() => grass),
      },
    ],
  ]),
  terrain: new Matrix<Terrain>([40, 30]).fill(() => grass),
  hero: {
    symbol: "@",
    position: [0, 0],
  },
  clock: initialClock,
});
