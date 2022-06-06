import * as ROT from "rot-js";
import * as Game from "../Game";

interface Screen {
  goTo(screen: Screen): void;
  update(gameState: Game.State): void;
  render(display: ROT.Display): void;
}

export default Screen;
