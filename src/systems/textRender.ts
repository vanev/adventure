import { system } from "../ECS";
import PositionComponent from "../components/Position";
import TextComponent from "../components/Text";
import textPositionQuery from "../queries/textPosition";
import Display from "../UI/Display";
import Tick from "../Tick";

const textRender = (display: Display) =>
  system([textPositionQuery], ([textPositionResults]) => (tick: Tick) => {
    for (const [id, entity] of textPositionResults()) {
      const position = entity.getComponent(PositionComponent);
      const text = entity.getComponent(TextComponent);
      display.drawText(position.data, text.data);
    }
  });

export default textRender;
