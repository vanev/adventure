import Game from "../Game";
import Menu from "../Menu";
import { generate as generateWorld } from "../World";
import MenuContainer from "../UI/MenuContainer";
import Screen from "./Screen";
import WorldScreen from "./WorldScreen";

class MainMenuScreen implements Screen {
  game: Game;
  menu: Menu<MainMenuScreen> = new Menu([
    {
      label: "New World",
      action: (screen) => {
        screen.game.changeScreen(new WorldScreen(screen.game, generateWorld()));
      },
    },
    {
      label: "Load World",
      action: (screen) => {
        console.warn("Not Implemented");
      },
    },
  ]);

  constructor(game: Game) {
    this.game = game;
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
      }
    });

    this.game.ui.display.drawText([5, 2], "Adventure!");

    const menuContainer = new MenuContainer({
      position: [3, 5],
      size: [30, 30],
      parent: this.game.ui.display,
      menu: this.menu,
    });

    menuContainer.drawMenu();
  };
}

export default MainMenuScreen;
