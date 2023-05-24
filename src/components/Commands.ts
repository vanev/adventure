import { Component } from "~/src/ECS";

export default class Commands<C> extends Component<Map<C, number>> {
  constructor(commands: Map<C, number> = new Map()) {
    super(commands);
  }
}
