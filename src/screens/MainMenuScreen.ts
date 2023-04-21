import Application from "../Application";
import Menu from "../Menu";
import { generate as generateWorld } from "../World";
import MenuContainer from "../UI/MenuContainer";
import Screen from "./Screen";
import WorldScreen from "./WorldScreen";

class MainMenuScreen implements Screen {
  application: Application;
  menu: Menu<MainMenuScreen> = new Menu([
    {
      label: "New World",
      action: (screen) => {
        screen.application.changeScreen(
          new WorldScreen(screen.application, generateWorld()),
        );
      },
    },
    {
      label: "Load World",
      action: (screen) => {
        console.warn("Not Implemented");
      },
    },
  ]);

  constructor(application: Application) {
    this.application = application;
  }

  update = () => {
    this.application.ui.keyboard.pressed.forEach((key) => {
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

    this.application.ui.display.drawText([5, 2], "Adventure!");

    const menuContainer = new MenuContainer({
      position: [3, 5],
      size: [30, 30],
      parent: this.application.ui.display,
      menu: this.menu,
    });

    menuContainer.drawMenu();
  };
}

export default MainMenuScreen;
