import Display, { Config } from "./Display";
import Keyboard from "./Keyboard";

class UI {
  display: Display;
  keyboard: Keyboard = new Keyboard();

  constructor(parent: HTMLElement, config: Config) {
    this.display = new Display(config);
    parent.appendChild(this.display.canvas);
  }

  update = () => {
    this.display.render();
    this.keyboard.clear();
  };
}

export default UI;
