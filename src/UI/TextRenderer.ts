import Vector2 from "../lib/Vector2";

interface TextRenderer {
  drawText(point: Vector2, content: string): void;
}

export default TextRenderer;
