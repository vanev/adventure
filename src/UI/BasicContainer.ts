import Rectangle from "../lib/Rectangle";
import Vector2, { add } from "../lib/Vector2";
import RenderPlan from "./RenderPlan";
import Container from "./Container";

export type Config = {
  position: Vector2;
  size: Vector2;
  parent: Container;
};

export default class BasicContainer implements Container {
  private bounds: Rectangle;
  private parent: Container;

  constructor({ position, size, parent }: Config) {
    this.bounds = new Rectangle(position, size);
    this.parent = parent;
  }

  draw(point: Vector2, plan: RenderPlan): void {
    const actual = add(point, this.bounds.origin);
    if (!this.bounds.contains(actual)) return;

    this.parent.draw(actual, plan);
  }

  drawText(point: Vector2, content: string): void {
    const actual = add(point, this.bounds.origin);
    if (!this.bounds.contains(actual)) return;

    this.parent.drawText(actual, content);
  }
}
