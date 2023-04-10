import Application from "../Application";
import Menu from "../Menu";
import MenuContainer from "../UI/MenuContainer";
import MainMenuScreen from "./MainMenuScreen";
import Screen from "./Screen";

class PauseScreen implements Screen {
  application: Application;
  previousScreen: Screen;
  menu: Menu<PauseScreen> = new Menu([
    {
      label: "Continue",
      action: (screen) => {
        screen.application.changeScreen(screen.previousScreen);
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
        screen.application.changeScreen(new MainMenuScreen(screen.application));
      },
    },
  ]);

  constructor(application: Application, previousScreen: Screen) {
    this.application = application;
    this.previousScreen = previousScreen;
  }

  onTick = () => {
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

    this.application.ui.display.drawText([5, 2], "Paused...");

    const menuContainer = new MenuContainer({
      position: [3, 5],
      size: [30, 30],
      parent: this.application.ui.display,
      menu: this.menu,
    });

    menuContainer.drawMenu();
  };
}

export default PauseScreen;
