import { Id, generateUnique } from "../lib/Id";
import Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
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
        position: new Vector2(4, 6),
        symbol: "X",
        terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
      },
    ],
    [
      generateUnique(),
      {
        name: "Ruins of Denerin",
        position: new Vector2(10, 3),
        symbol: "X",
        terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
      },
    ],
    [
      generateUnique(),
      {
        name: "Raelan Creek",
        position: new Vector2(17, 23),
        symbol: "X",
        terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
      },
    ],
    [
      generateUnique(),
      {
        name: "Really Very Long Namesvilletown",
        position: new Vector2(14, 18),
        symbol: "X",
        terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
      },
    ],
  ]),
  terrain: new Matrix<Terrain>(new Vector2(40, 30)).fill(() => grass),
  hero: {
    symbol: "@",
    position: new Vector2(0, 0),
  },
  clock: initialClock,
});
