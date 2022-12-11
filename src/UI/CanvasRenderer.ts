import Color from "../Color";
import Vector2 from "../lib/Vector2";
import Tilesheet from "../Tilesheet";
import Renderer from "./Renderer";
import RenderPlan from "./RenderPlan";

class CanvasRenderer implements Renderer {
  context: CanvasRenderingContext2D;
  tilesheet: Tilesheet;
  tileWidth: number;
  tileHeight: number;
  backgroundColor: Color;

  constructor(
    context: CanvasRenderingContext2D,
    tilesheet: Tilesheet,
    tileWidth: number,
    tileHeight: number,
    backgroundColor: Color,
  ) {
    this.context = context;
    this.tilesheet = tilesheet;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.backgroundColor = backgroundColor;
  }

  draw = (
    [x, y]: Vector2,
    { key, background = this.backgroundColor }: RenderPlan,
  ) => {
    this.context.fillStyle = background;
    this.context.fillRect(
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    );

    const source = this.tilesheet.findTile(key);
    if (source) {
      const [sourceX, sourceY] = source;

      this.context.drawImage(
        this.tilesheet.image,
        sourceX,
        sourceY,
        this.tilesheet.tileWidth,
        this.tilesheet.tileHeight,
        x * this.tileWidth,
        y * this.tileHeight,
        this.tileWidth,
        this.tileHeight,
      );
    }
  };
}

export default CanvasRenderer;
