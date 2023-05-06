import Tick from "../Tick";

interface Screen {
  update(tick: Tick): void;
}

export default Screen;
