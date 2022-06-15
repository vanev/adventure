import Vector2 from "../lib/Vector2";
import Tilesheet from "../Tilesheet";
import RenderPlan from "./RenderPlan";

class CanvasRenderer {
  context: CanvasRenderingContext2D;
  tilesheet: Tilesheet;

  constructor(context: CanvasRenderingContext2D, tilesheet: Tilesheet) {
    this.context = context;
    this.tilesheet = tilesheet;
  }

  draw = ([x, y]: Vector2, { key, background }: RenderPlan) => {
    this.context.fillStyle = background;
    this.context.fillRect(
      x * this.tilesheet.tileWidth,
      y * this.tilesheet.tileHeight,
      this.tilesheet.tileWidth,
      this.tilesheet.tileHeight,
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
        x * this.tilesheet.tileWidth,
        y * this.tilesheet.tileHeight,
        this.tilesheet.tileWidth,
        this.tilesheet.tileHeight,
      );
    }
  };
}

export default CanvasRenderer;
