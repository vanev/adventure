import Color from "../Color";
import { Display } from "../Display";
import { State } from "../Game";
import Menu from "../Menu";
import MainMenuScreen from "./MainMenuScreen";
import Screen from "./Screen";

class PauseScreen implements Screen {
  goTo: (screen: Screen) => void;
  previousScreen: Screen;
  menu: Menu<PauseScreen> = new Menu([
    {
      label: "Continue",
      action: (screen) => {
        screen.goTo(screen.previousScreen);
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
        screen.goTo(new MainMenuScreen(screen.goTo));
      },
    },
  ]);

  constructor(goTo: (screen: Screen) => void, previousScreen: Screen) {
    this.goTo = goTo;
    this.previousScreen = previousScreen;
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
      }
    });
  };

  render = (display: Display) => {
    display.drawText(5, 2, "Paused...");

    this.menu.items.forEach((item, index) => {
      display.drawText(5, index + 5, item.label);

      if (this.menu.selected === index) {
        display.drawOver(3, index + 5, "›", Color.LightWhite, "");
      }
    });
  };
}

export default PauseScreen;
