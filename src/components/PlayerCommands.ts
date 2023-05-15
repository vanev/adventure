import { Component } from "../ECS";
import KeyMap from "../KeyMap";

export default class PlayerCommands<C> extends Component<{
  keyMap: KeyMap<C>;
  commands: Map<C, number>;
}> {
  constructor(keyMap: KeyMap<C>) {
    super({
      keyMap,
      commands: new Map(),
    });
  }
}
