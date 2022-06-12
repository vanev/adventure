import { Display } from "../Display";
import * as Game from "../Game";

interface Screen {
  goTo(screen: Screen): void;
  update(gameState: Game.State): void;
  render(display: Display): void;
}

export default Screen;
