import Key from "~/src/lib/Key";
import Screen from "~/src/Screen";
import KeyMap from "~/src/KeyMap";
import TextComponent from "~/src/components/Text";
import PositionComponent from "~/src/components/Position";
import SizeComponent from "~/src/components/Size";
import PlayerInputComponent from "../components/PlayerInput";
import CommandsComponent from "~/src/components/Commands";
import MenuComponent from "~/src/components/Menu";
import textRenderSystem from "~/src/systems/textRender";
import playerInputSystem from "~/src/systems/playerInput";
import menuRenderSystem from "~/src/systems/menuRender";
import menuControlSystem, {
  MenuCommand,
  selectPreviousMenuItem,
  selectNextMenuItem,
  performSelectedAction,
} from "~/src/systems/menuControl";
import GameScreen from "./GameScreen";

const keyMap: KeyMap<MenuCommand> = {
  [Key.ArrowUp]: selectPreviousMenuItem,
  [Key.ArrowDown]: selectNextMenuItem,
  [Key.Enter]: performSelectedAction,
};

export default class MainMenuScreen extends Screen {
  enter = () => {
    //
    // Systems
    //
    this.engine.addSystem(playerInputSystem(this.application.ui.keyboard));
    this.engine.addSystem(menuControlSystem);
    this.engine.addSystem(textRenderSystem(this.application.ui.display));
    this.engine.addSystem(menuRenderSystem(this.application.ui.display));

    //
    // Entities
    //
    const title = this.engine.createEntity();
    title.addComponent(new TextComponent("Adventure!"));
    title.addComponent(new PositionComponent([5, 2]));

    const menu = this.engine.createEntity();
    menu.addComponent(
      new MenuComponent([
        {
          label: "New World",
          action: () => {
            this.application.screens.push(new GameScreen(this.application));
          },
        },
        {
          label: "Load World",
          action: () => {
            console.warn("Not Implemented");
          },
        },
      ]),
    );
    menu.addComponent(new PositionComponent([3, 5]));
    menu.addComponent(new SizeComponent([30, 30]));
    menu.addComponent(new PlayerInputComponent(keyMap));
    menu.addComponent(new CommandsComponent());
  };
}
