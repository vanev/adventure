import { second } from "../lib/Duration";
import { Id } from "../lib/Id";
import { cardinalNeighbors } from "../lib/Vector2";
import Key from "../lib/Key";
import Application from "../Application";
import { World, Place } from "../World";
import MapCameraContainer from "../UI/MapCameraContainer";
import Screen from "./Screen";
import PauseScreen from "./PauseScreen";
import BasicContainer from "../UI/BasicContainer";
import Color from "../Color";

class PlaceScreen implements Screen {
  application: Application;
  world: World;
  location: Place;
  speed: number = 0;

  constructor(application: Application, world: World, id: Id) {
    this.application = application;
    this.world = world;

    const location = world.locations.get(id);
    if (!location) throw new Error("Place not found.");
    this.location = location;
  }

  update = (delta: number) => {
    if (this.speed > 0) {
      this.world.clock.sinceLastTick += delta;
      if (this.world.clock.sinceLastTick > (1 / this.speed) * second) {
        this.world.clock.current += 1;
        this.world.clock.sinceLastTick = 0;
      }
    }

    this.application.ui.keyboard.pressed.forEach((_pressedAt, key) => {
      switch (key) {
        case Key.Space:
          this.speed = this.speed === 0 ? 1 : 0;
          break;

        case Key.ArrowUp:
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).North;
          break;

        case Key.ArrowDown:
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).South;
          break;

        case Key.ArrowLeft:
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).West;
          break;

        case Key.ArrowRight:
          this.world.hero.position = cardinalNeighbors(
            this.world.hero.position,
          ).East;
          break;

        case Key.Escape:
          this.application.changeScreen(
            new PauseScreen(this.application, this),
          );
          break;
      }
    });

    this.application.ui.display.drawText([5, 2], this.location.name);

    const mapCameraContainer = new MapCameraContainer({
      position: [0, 5],
      size: [60, 34],
      parent: this.application.ui.display,
      map: this.world.terrain,
      focus: this.world.hero.position,
    });

    mapCameraContainer.drawMap();

    mapCameraContainer.drawOnMap(this.world.hero.position, {
      key: this.world.hero.symbol,
      background: Color.MidBlack,
    });

    const infoContainer = new BasicContainer({
      position: [0, 39],
      size: [60, 1],
      parent: this.application.ui.display,
    });

    infoContainer.drawText([0, 0], `Speed: ${this.speed}`);
    infoContainer.drawText([10, 0], `Clock: ${this.world.clock.current}`);
  };
}

export default PlaceScreen;
