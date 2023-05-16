import { Component } from "~/src/ECS";

export default class PlayerCommands<C> extends Component<Map<C, number>> {
  constructor(commands: Map<C, number> = new Map()) {
    super(commands);
  }
}
