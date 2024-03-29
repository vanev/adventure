import * as Rectangle from "../lib/Rectangle";
import Vector2 from "../lib/Vector2";
import RenderPlan from "./RenderPlan";
import Container from "./Container";

export type Config = {
  position: Vector2;
  size: Vector2;
  parent: Container;
};

export default class BasicContainer implements Container {
  private bounds: Rectangle.Rectangle;
  private parent: Container;

  constructor({ position, size, parent }: Config) {
    this.bounds = Rectangle.rectangle(position, size);
    this.parent = parent;
  }

  draw(point: Vector2, plan: RenderPlan): void {
    const actual = point.add(this.bounds.origin);
    if (!Rectangle.contains(actual)(this.bounds)) return;

    this.parent.draw(actual, plan);
  }

  drawText(point: Vector2, content: string): void {
    const actual = point.add(this.bounds.origin);
    if (!Rectangle.contains(actual)(this.bounds)) return;

    this.parent.drawText(actual, content);
  }
}
