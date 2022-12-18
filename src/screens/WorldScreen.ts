import { pipe } from "fp-ts/lib/function";
import { isNonEmpty, map } from "fp-ts/lib/Array";
import { toArray } from "fp-ts/lib/Map";
import { Id, Ord as idOrd } from "../lib/Id";
import Color from "../Color";
import Game from "../Game";
import Menu, { Item } from "../Menu";
import { World, Place } from "../World";
import MapCameraContainer from "../UI/MapCameraContainer";
import MenuContainer from "../UI/MenuContainer";
import Screen from "./Screen";
import PlaceScreen from "./PlaceScreen";
import PauseScreen from "./PauseScreen";

class WorldScreen implements Screen {
  game: Game;
  world: World;
  menu: Menu<WorldScreen>;
  locations: Array<[Id, Place]>;

  constructor(game: Game, world: World) {
    this.game = game;
    this.world = world;
    this.locations = pipe(world.locations, toArray(idOrd));

    const menuItems = pipe(
      this.locations,
      map(
        ([id, location]): Item<WorldScreen> => ({
          label: location.name,
          action: (screen) => {
            screen.game.changeScreen(new PlaceScreen(screen.game, world, id));
          },
        }),
      ),
    );
    this.menu = new Menu(
      isNonEmpty(menuItems)
        ? menuItems
        : [{ label: "No Places", action: () => {} }],
    );
  }

  onTick = () => {
    this.game.ui.keyboard.pressed.forEach((key) => {
      switch (key) {
        case "j":
          this.menu.down();
          break;

        case "k":
          this.menu.up();
          break;

        case "Enter":
          const action = this.menu.action();
          action(this);
          break;

        case "Escape":
          this.game.changeScreen(new PauseScreen(this.game, this));
          break;
      }
    });

    this.game.ui.display.drawText([5, 2], this.world.name);

    const menuContainer = new MenuContainer({
      position: [3, 5],
      size: [30, 30],
      parent: this.game.ui.display,
      menu: this.menu,
    });

    menuContainer.drawMenu();

    const [_, selectedPlace] = this.locations[this.menu.selected];

    const mapCameraContainer = new MapCameraContainer({
      position: [30, 2],
      size: [30, 30],
      parent: this.game.ui.display,
      map: this.world.terrain,
      focus: selectedPlace.position,
    });

    mapCameraContainer.drawMap();

    this.locations.forEach(([_, location], index) => {
      mapCameraContainer.drawOnMap(location.position, {
        key: location.symbol,
        background:
          this.menu.selected === index ? Color.BrightPurple : Color.DarkBlack,
      });
    });
  };
}

export default WorldScreen;
