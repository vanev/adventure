import { Display, initialize as initializeDisplay } from "../Display";
import Color from "../Color";
import Screen from "../screens/Screen";
import MainMenuScreen from "../screens/MainMenuScreen";
import { State, initial as initialState } from "./State";

export type { State };

class Game {
  state: State = initialState;
  display: Display;
  screen: Screen;

  constructor(parentElement: HTMLElement) {
    this.display = initializeDisplay(parentElement);
    this.screen = new MainMenuScreen(this.handleScreenChange);
  }

  start = () => {
    const loop = () => {
      const { tick, keyboard } = this.state;

      tick.update();

      this.screen.update(this.state);

      this.display.clear();
      this.screen.render(this.display);

      // Debug Stuff
      const fps = this.state.tick.fps.toFixed(0);
      const fpsText = `${fps}`;
      this.display.drawText(96, 0, fpsText);

      keyboard.clear();

      requestAnimationFrame(loop);
    };

    loop();
  };

  handleScreenChange = (newScreen: Screen) => {
    this.screen = newScreen;
  };
}

export default Game;
