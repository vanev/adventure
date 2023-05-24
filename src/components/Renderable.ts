import { Component } from "~/src/ECS";
import Color from "~/src/Color";
import RenderPlan from "~/src/UI/RenderPlan";

export default class Renderable extends Component<RenderPlan> {
  constructor(key: string, background?: Color) {
    super({ key, background });
  }
}
