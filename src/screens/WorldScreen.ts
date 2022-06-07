import { pipe } from "fp-ts/lib/function";
import { isNonEmpty, map } from "fp-ts/lib/Array";
import { toArray } from "fp-ts/lib/Map";
import { Id, Ord as idOrd } from "../lib/Id";
import * as Matrix from "../lib/Matrix";
import Color from "../Color";
import { Display } from "../Display";
import { State } from "../Game";
import Menu, { Item } from "../Menu";
import * as World from "../World";
import Screen from "./Screen";
import LocationScreen from "./LocationScreen";
import PauseScreen from "./PauseScreen";

class WorldScreen implements Screen {
  goTo: (screen: Screen) => void;
  world: World.World;
  menu: Menu<WorldScreen>;
  locations: Array<[Id, World.Location]>;

  constructor(goTo: (screen: Screen) => void, world: World.World) {
    this.goTo = goTo;
    this.world = world;
    this.locations = pipe(world.locations, toArray(idOrd));

    const menuItems = pipe(
      this.locations,
      map(
        ([id, location]): Item<WorldScreen> => ({
          label: location.name,
          action: (screen) => {
            screen.goTo(new LocationScreen(this.goTo, world, id));
          },
        }),
      ),
    );
    this.menu = new Menu(
      isNonEmpty(menuItems)
        ? menuItems
        : [{ label: "No Locations", action: () => {} }],
    );
  }

  update = (state: State) => {
    state.keyboard.pressed.forEach((key) => {
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
          this.goTo(new PauseScreen(this.goTo, this));
          break;
      }
    });
  };

  render = (display: Display) => {
    display.drawText(5, 2, this.world.name);

    this.menu.forEach((item, selected, index) => {
      display.drawText(5, index + 5, item.label);

      if (selected) {
        display.drawOver(3, index + 5, "›", Color.LightWhite, "");
      }
    });

    const mapTop = 2;
    const mapLeft = 30;

    Matrix.forEach((terrain: World.Terrain, [x, y]) => {
      display.draw(
        x + mapLeft,
        y + mapTop,
        terrain.symbol,
        terrain.foregroundColor,
        terrain.backgroundColor,
      );
    })(this.world.terrain);

    this.locations.forEach(([id, location], index) => {
      display.drawOver(
        location.position[0] + mapLeft,
        location.position[1] + mapTop,
        location.symbol,
        this.menu.selected === index ? Color.BrightPurple : Color.LightWhite,
        "",
      );
    });
  };
}

export default WorldScreen;
