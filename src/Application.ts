import UI from "./UI";
import Screen from "./screens/Screen";
import MainMenuScreen from "./screens/MainMenuScreen";
import * as Tick from "./Tick";

class Application {
  tick: Tick.Tick = Tick.initial();
  ui: UI;
  screen: Screen;

  constructor(ui: UI) {
    this.ui = ui;
    this.screen = new MainMenuScreen(this);
  }

  start = () => {
    const loop = () => {
      this.tick = Tick.update(this.tick);

      this.screen.onTick();

      // Debug Stuff
      const fps = this.tick.fps.toFixed(0);
      const fpsText = `${fps}`;
      this.ui.display.drawText([96, 0], fpsText);

      this.ui.onTick();

      requestAnimationFrame(loop);
    };

    loop();
  };

  changeScreen = (newScreen: Screen) => {
    this.screen = newScreen;
  };
}

export default Application;
