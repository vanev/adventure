import Application from "./Application";
import { Engine } from "./ECS";
import Tick from "./Tick";

export default class Screen {
  application: Application;
  engine: Engine<Tick>;

  constructor(application: Application, engine: Engine<Tick> = new Engine()) {
    this.application = application;
    this.engine = engine;
  }

  update = (t: Tick) => this.engine.update(t);

  enter = (): void => {};

  leave = (): void => {};
}
