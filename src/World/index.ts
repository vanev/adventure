import { Id, generateUnique } from "../lib/Id";
import { Matrix, fill, empty } from "../lib/Matrix";
import { Location } from "./Location";
import { Terrain, grass } from "./Terrain";
import { Hero } from "./Hero";

export type { Terrain, Location, Hero };

export type World = {
  name: string;
  locations: Map<Id, Location>;
  terrain: Matrix<Terrain>;
  hero: Hero;
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
        terrain: fill(() => grass)(empty([40, 30])),
      },
    ],
    [
      generateUnique(),
      {
        name: "Ruins of Denerin",
        position: [10, 3],
        symbol: "X",
        terrain: fill(() => grass)(empty([40, 30])),
      },
    ],
    [
      generateUnique(),
      {
        name: "Raelan Creek",
        position: [17, 23],
        symbol: "X",
        terrain: fill(() => grass)(empty([40, 30])),
      },
    ],
    [
      generateUnique(),
      {
        name: "Really Very Long Namesvilletown",
        position: [14, 18],
        symbol: "X",
        terrain: fill(() => grass)(empty([40, 30])),
      },
    ],
  ]),
  terrain: fill(() => grass)(empty([40, 30])),
  hero: {
    symbol: "@",
    position: [0, 0],
  },
});
