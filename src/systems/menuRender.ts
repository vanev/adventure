import { query, system } from "../ECS";
import Display from "../UI/Display";
import BasicContainer from "../UI/BasicContainer";
import Tick from "../Tick";
import PositionComponent from "../components/Position";
import SizeComponent from "../components/Size";
import MenuComponent from "../components/Menu";

const menuRenderQuery = query({
  all: new Set([MenuComponent, PositionComponent, SizeComponent]),
});

const menuRenderSystem = (display: Display) =>
  system([menuRenderQuery], ([menuRenderResults]) => (tick: Tick) => {
    for (const [id, entity] of menuRenderResults()) {
      const position = entity.getComponent(PositionComponent);
      const size = entity.getComponent(SizeComponent);
      const menu = entity.getComponent(MenuComponent);

      const container = new BasicContainer({
        position: position.data,
        size: size.data,
        parent: display,
      });

      menu.data.items.forEach((item, index) => {
        container.drawText([2, index], item.label);

        if (menu.data.selected === index) {
          container.draw([0, index], { key: "X" });
        }
      });
    }
  });

export default menuRenderSystem;
