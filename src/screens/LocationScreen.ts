import { second } from "../lib/Duration";
import { Id } from "../lib/Id";
import Game from "../Game";
import World, { Location } from "../World";
import Screen from "./Screen";
import PauseScreen from "./PauseScreen";
import Color from "../Color";

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
          this.world.hero.position =
            this.world.hero.position.cardinalNeighbors().North;
          break;

        case "ArrowDown":
          this.world.hero.position =
            this.world.hero.position.cardinalNeighbors().South;
          break;

        case "ArrowLeft":
          this.world.hero.position =
            this.world.hero.position.cardinalNeighbors().West;
          break;

        case "ArrowRight":
          this.world.hero.position =
            this.world.hero.position.cardinalNeighbors().East;
          break;

        case "Escape":
          this.game.changeScreen(new PauseScreen(this.game, this));
          break;
      }
    });

    this.game.ui.display.drawText(5, 2, this.location.name);

    const mapTop = 5;
    const mapLeft = 0;

    this.location.terrain.forEach((terrain, { x, y }) => {
      this.game.ui.display.draw(
        x + mapLeft,
        y + mapTop,
        terrain.symbol,
        terrain.foregroundColor,
        terrain.backgroundColor,
      );
    });

    this.game.ui.display.drawOver(
      this.world.hero.position.x + mapLeft,
      this.world.hero.position.y + mapTop,
      this.world.hero.symbol,
      Color.LightWhite,
    );

    this.game.ui.display.drawText(0, 39, `Speed: ${this.speed}`);

    this.game.ui.display.drawText(10, 39, `Clock: ${this.world.clock.current}`);
  };
}

export default LocationScreen;
