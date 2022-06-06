import Color from "../Color";
import { Display } from "../Display";
import { State } from "../Game";
import Menu from "../Menu";
import Screen from "./Screen";

class MainMenuScreen implements Screen {
  goTo: (screen: Screen) => void;
  menu: Menu<MainMenuScreen> = new Menu([
    {
      label: "New World",
      action: (screen) => {
        console.warn("Not Implemented");
      },
    },
    {
      label: "Load World",
      action: (screen) => {
        console.warn("Not Implemented");
      },
    },
  ]);

  constructor(goTo: (screen: Screen) => void) {
    this.goTo = goTo;
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
    display.drawText(5, 2, "Adventure!");

    this.menu.forEach((item, selected, index) => {
      display.drawText(5, index + 5, item.label);

      if (selected) {
        display.drawOver(3, index + 5, "›", Color.LightWhite, "");
      }
    });
  };
}

export default MainMenuScreen;
