import { second } from "../lib/Duration";
import { Id } from "../lib/Id";
import { cardinalNeighbors } from "../lib/Vector2";
import Game from "../Game";
import { World, Location } from "../World";
import MapCameraContainer from "../UI/MapCameraContainer";
import Screen from "./Screen";
import PauseScreen from "./PauseScreen";
import BasicContainer from "../UI/BasicContainer";

class LocationScreen implements Screen {
  game: Game;
  world: World;
  location: Location;
  speed: number = 0;

  constructor(game: Game, world: World, id: Id) {
    this.game = game;
    this.world = world;

    const location = world.locations.get(id);
    if (!location) throw new Error("Location not found.");
    this.location = location;
  }

  onTick = () => {
    if (this.speed > 0) {
      this.world.clock.sinceLastTick += this.game.state.tick.sinceLast;
      if (this.world.clock.sinceLastTick > (1 / this.speed) * second) {
        this.world.clock.current += 1;
        this.world.clock.sinceLastTick = 0;
      }
    }

    this.game.ui.keyboard.pressed.forEach((key) => {
      switch (key) {
        case " ":
          this.speed = this.speed === 0 ? 1 : 0;
          break;

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
          this.game.changeScreen(new PauseScreen(this.game, this));
          break;
      }
    });

    this.game.ui.display.drawText([5, 2], this.location.name);

    const mapCameraContainer = new MapCameraContainer({
      position: [0, 5],
      size: [60, 34],
      parent: this.game.ui.display,
      map: this.world.terrain,
      focus: this.world.hero.position,
    });

    mapCameraContainer.drawMap();

    mapCameraContainer.drawOnMap(this.world.hero.position, {
      key: this.world.hero.symbol,
    });

    const infoContainer = new BasicContainer({
      position: [0, 39],
      size: [60, 1],
      parent: this.game.ui.display,
    });

    infoContainer.drawText([0, 0], `Speed: ${this.speed}`);
    infoContainer.drawText([10, 0], `Clock: ${this.world.clock.current}`);
  };
}

export default LocationScreen;
