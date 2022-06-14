import Color from "../Color";
import Game from "../Game";
import Menu from "../Menu";
import MainMenuScreen from "./MainMenuScreen";
import Screen from "./Screen";

class PauseScreen implements Screen {
  game: Game;
  previousScreen: Screen;
  menu: Menu<PauseScreen> = new Menu([
    {
      label: "Continue",
      action: (screen) => {
        screen.game.handleScreenChange(screen.previousScreen);
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
        screen.game.handleScreenChange(new MainMenuScreen(screen.game));
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

    this.game.ui.display.drawText(5, 2, "Paused...");

    this.menu.items.forEach((item, index) => {
      this.game.ui.display.drawText(5, index + 5, item.label);

      if (this.menu.selected === index) {
        this.game.ui.display.drawOver(3, index + 5, "›", Color.LightWhite);
      }
    });
  };
}

export default PauseScreen;
