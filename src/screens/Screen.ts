import Application from "../Application";

interface Screen {
  application: Application;
  onTick(): void;
}

export default Screen;
