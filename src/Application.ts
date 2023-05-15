import UI from "./UI";
import MainMenuScreen from "./screens/MainMenuScreen";
import Tick from "./Tick";
import ScreenStack from "./ScreenStack";

class Application {
  tick = new Tick();
  screens: ScreenStack;
  ui: UI;

  constructor(ui: UI) {
    this.ui = ui;
    this.screens = new ScreenStack([new MainMenuScreen(this)]);
  }

  start = () => {
    const loop = () => {
      this.tick.update();

      this.screens.peek().update(this.tick);

      // Debug Stuff
      const fps = this.tick.fps.toFixed(0);
      const fpsText = `${fps}`;
      this.ui.display.drawText([58, 0], fpsText);

      this.ui.update();

      requestAnimationFrame(loop);
    };

    loop();
  };
}

export default Application;
