import Vector2 from "../lib/Vector2";
import Tilesheet from "../Tilesheet";
import RenderPlan from "./RenderPlan";

class CanvasRenderer {
  context: CanvasRenderingContext2D;
  tilesheet: Tilesheet;
  tileWidth: number;
  tileHeight: number;

  constructor(
    context: CanvasRenderingContext2D,
    tilesheet: Tilesheet,
    tileWidth: number,
    tileHeight: number,
  ) {
    this.context = context;
    this.tilesheet = tilesheet;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  draw = ([x, y]: Vector2, { key, background }: RenderPlan) => {
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
