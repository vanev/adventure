import Game from "../Game";
import Menu from "../Menu";
import MenuContainer from "../UI/MenuContainer";
import MainMenuScreen from "./MainMenuScreen";
import Screen from "./Screen";

class PauseScreen implements Screen {
  game: Game;
  previousScreen: Screen;
  menu: Menu<PauseScreen> = new Menu([
    {
      label: "Continue",
      action: (screen) => {
        screen.game.changeScreen(screen.previousScreen);
      },
    },
    {
      label: "Save World",
      action: (screen) => {
        console.warn("Not Implemented");
      },
    },
    {
      label: "Quit to Main Menu",
      action: (screen) => {
        screen.game.changeScreen(new MainMenuScreen(screen.game));
      },
    },
  ]);

  constructor(game: Game, previousScreen: Screen) {
    this.game = game;
    this.previousScreen = previousScreen;
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

    this.game.ui.display.drawText([5, 2], "Paused...");

    const menuContainer = new MenuContainer({
      position: [3, 5],
      size: [30, 30],
      parent: this.game.ui.display,
      menu: this.menu,
    });

    menuContainer.drawMenu();
  };
}

export default PauseScreen;
