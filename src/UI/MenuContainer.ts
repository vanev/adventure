import Vector2 from "../lib/Vector2";
import Menu from "../Menu";
import Screen from "../screens/Screen";
import BasicContainer from "./BasicContainer";
import Container from "./Container";
import RenderPlan from "./RenderPlan";

export type Config<S extends Screen> = {
  position: Vector2;
  size: Vector2;
  parent: Container;

  menu: Menu<S>;
};

export default class MenuContainer<S extends Screen> implements Container {
  private container: Container;
  private menu: Menu<S>;

  constructor({ position, size, parent, menu }: Config<S>) {
    this.container = new BasicContainer({ position, size, parent });
    this.menu = menu;
  }

  draw(point: Vector2, plan: RenderPlan): void {
    this.container.draw(point, plan);
  }

  drawText(point: Vector2, content: string): void {
    this.container.drawText(point, content);
  }

  drawMenu(): void {
    this.menu.forEach((item, selected, index) => {
      this.drawText([2, index], item.label);

      if (selected) {
        this.draw([0, index], { key: "X" });
      }
    });
  }
}
