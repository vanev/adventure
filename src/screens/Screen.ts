import Application from "../Application";

interface Screen {
  application: Application;
  update(delta: number): void;
}

export default Screen;
