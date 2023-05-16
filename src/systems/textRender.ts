import { system, query } from "../ECS";
import Position from "../components/Position";
import Text from "../components/Text";
import Display from "../UI/Display";
import Tick from "../Tick";

const textPositionQuery = query({
  all: new Set([Text, Position]),
});

const textRender = (display: Display) =>
  system([textPositionQuery], ([textPositionResults]) => (tick: Tick) => {
    for (const [id, entity] of textPositionResults()) {
      const position = entity.getComponent(Position);
      const text = entity.getComponent(Text);
      display.drawText(position.data, text.data);
    }
  });

export default textRender;
