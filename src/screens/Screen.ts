import Game from "../Game";

interface Screen {
  game: Game;
  onTick(): void;
}

export default Screen;
