import { pipe } from "fp-ts/lib/function";
import { isNonEmpty, map } from "fp-ts/lib/Array";
import { toArray } from "fp-ts/lib/Map";
import Rectangle from "../lib/Rectangle";
import Vector2 from "../lib/Vector2";
import { Id, Ord as idOrd } from "../lib/Id";
import Color from "../Color";
import Game from "../Game";
import Menu, { Item } from "../Menu";
import World, { Location } from "../World";
import Screen from "./Screen";
import LocationScreen from "./LocationScreen";
import PauseScreen from "./PauseScreen";

class WorldScreen implements Screen {
  game: Game;
  world: World;
  menu: Menu<WorldScreen>;
  locations: Array<[Id, Location]>;

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
            screen.game.changeScreen(
              new LocationScreen(screen.game, world, id),
            );
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

    this.game.ui.display.drawText(5, 2, this.world.name);

    this.menu.forEach((item, selected, index) => {
      this.game.ui.display.drawText(5, index + 5, item.label);

      if (selected) {
        this.game.ui.display.drawOver(3, index + 5, "›", Color.LightWhite);
      }
    });

    const mapRect = new Rectangle(new Vector2(30, 2), new Vector2(30, 30));

    this.world.terrain.forEach((terrain, point) => {
      this.game.ui.display.draw(
        point.x + mapRect.origin.x,
        point.y + mapRect.origin.y,
        terrain.symbol,
        terrain.foregroundColor,
        terrain.backgroundColor,
      );
    });

    this.locations.forEach(([id, location], index) => {
      this.game.ui.display.drawOver(
        location.position.x + mapRect.origin.x,
        location.position.y + mapRect.origin.y,
        location.symbol,
        this.menu.selected === index ? Color.BrightPurple : Color.LightWhite,
      );
    });
  };
}

export default WorldScreen;
