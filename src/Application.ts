import UI from "./UI";
import Screen from "./screens/Screen";
import MainMenuScreen from "./screens/MainMenuScreen";
import Tick from "./Tick";

class Application {
  tick: Tick = new Tick();
  ui: UI;
  screen: Screen;

  constructor(ui: UI) {
    this.ui = ui;
    this.screen = new MainMenuScreen(this);
  }

  start = () => {
    const loop = () => {
      this.tick.update();

      this.screen.update(this.tick.delta);

      // Debug Stuff
      const fps = this.tick.fps.toFixed(0);
      const fpsText = `${fps}`;
      this.ui.display.drawText([58, 0], fpsText);

      this.ui.update();

      requestAnimationFrame(loop);
    };

    loop();
  };

  changeScreen = (newScreen: Screen) => {
    this.screen = newScreen;
  };
}

export default Application;
