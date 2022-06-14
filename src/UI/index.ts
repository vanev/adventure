import Display, { Config } from "./Display";
import Keyboard from "./Keyboard";

class UI {
  display: Display;
  keyboard: Keyboard = new Keyboard();

  constructor(parent: HTMLElement, config: Config) {
    this.display = new Display(config);

    const container = this.display.getContainer();
    if (!container) throw new Error("Display Container Element Not Found");

    parent.appendChild(container);
  }

  onTick = () => {
    this.display.render();
    this.keyboard.clear();
  };
}

export default UI;
