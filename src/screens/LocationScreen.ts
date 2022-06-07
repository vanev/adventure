import { Id } from "../lib/Id";
import * as Matrix from "../lib/Matrix";
import { cardinalNeighbors } from "../lib/Vector2";
import { Display } from "../Display";
import { State } from "../Game";
import * as World from "../World";
import Screen from "./Screen";
import PauseScreen from "./PauseScreen";
import Color from "../Color";

class LocationScreen implements Screen {
  goTo: (screen: Screen) => void;
  world: World.World;
  location: World.Location;

  constructor(goTo: (screen: Screen) => void, world: World.World, id: Id) {
    this.goTo = goTo;
    this.world = world;

    const location = world.locations.get(id);
    if (!location) throw new Error("Location not found.");
    this.location = location;
  }

  update = (state: State) => {
    state.keyboard.pressed.forEach((key) => {
      switch (key) {
        case "ArrowUp":
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).North;
          break;

        case "ArrowDown":
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).South;
          break;

        case "ArrowLeft":
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).West;
          break;

        case "ArrowRight":
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).East;
          break;

        case "Escape":
          this.goTo(new PauseScreen(this.goTo, this));
          break;
      }
    });
  };

  render = (display: Display) => {
    display.drawText(5, 2, this.location.name);

    const mapTop = 5;
    const mapLeft = 0;

    Matrix.forEach((terrain: World.Terrain, [x, y]) => {
      display.draw(
        x + mapLeft,
        y + mapTop,
        terrain.symbol,
        terrain.foregroundColor,
        terrain.backgroundColor,
      );
    })(this.location.terrain);

    display.drawOver(
      this.world.hero.position[0] + mapLeft,
      this.world.hero.position[1] + mapTop,
      this.world.hero.symbol,
      Color.LightWhite,
      "",
    );
  };
}

export default LocationScreen;
