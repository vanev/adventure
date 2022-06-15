import Vector2 from "../lib/Vector2";
import RenderPlan from "./RenderPlan";

class CanvasRenderer {
  context: CanvasRenderingContext2D;
  tileWidth: number;
  tileHeight: number;

  constructor(
    context: CanvasRenderingContext2D,
    tileWidth: number,
    tileHeight: number,
  ) {
    this.context = context;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  draw = ([x, y]: Vector2, { content, foreground, background }: RenderPlan) => {
    this.context.fillStyle = background;
    this.context.fillRect(
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    );

    if (content) {
      this.context.fillStyle = foreground;
      this.context.fillText(content, x * this.tileWidth, y * this.tileHeight);
    }
  };
}

export default CanvasRenderer;
