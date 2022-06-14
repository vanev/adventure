import UI from "../UI";
import Screen from "../screens/Screen";
import MainMenuScreen from "../screens/MainMenuScreen";
import { State, initial as initialState } from "./State";

export type { State };

class Game {
  state: State = initialState;
  ui: UI;
  screen: Screen;

  constructor(ui: UI) {
    this.ui = ui;
    this.screen = new MainMenuScreen(this);
  }

  start = () => {
    const loop = () => {
      const { tick } = this.state;
      tick.update();

      this.screen.onTick();

      // Debug Stuff
      const fps = this.state.tick.fps.toFixed(0);
      const fpsText = `${fps}`;
      this.ui.display.drawText(96, 0, fpsText);

      this.ui.onTick();

      requestAnimationFrame(loop);
    };

    loop();
  };

  handleScreenChange = (newScreen: Screen) => {
    this.screen = newScreen;
  };
}

export default Game;
