import { query } from "../ECS";
import TextComponent from "../components/Text";
import PositionComponent from "../components/Position";

const textPosition = query({
  all: new Set([TextComponent, PositionComponent]),
});

export default textPosition;
