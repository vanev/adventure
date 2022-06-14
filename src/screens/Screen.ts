import Game from "../Game";

interface Screen {
  game: Game;
  update(): void;
  render(): void;
}

export default Screen;
