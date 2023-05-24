import Color from "../Color";
import Vector2 from "../lib/Vector2";
import Tilesheet from "../Tilesheet";
import CanvasRenderer from "./CanvasRenderer";
import Renderer from "./Renderer";
import RenderPlan from "./RenderPlan";
import TextRenderer from "./TextRenderer";
import VirtualRenderer from "./VirtualRenderer";

export type Config = {
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  background: Color;
  foreground: Color;
  tilesheet: Tilesheet;
};

class Display implements Renderer, TextRenderer {
  actualRenderer: Renderer;
  virtualRenderer: VirtualRenderer = new VirtualRenderer();
  canvas: HTMLCanvasElement;
  background: Color;
  foreground: Color;

  constructor({
    width,
    height,
    tileWidth,
    tileHeight,
    background,
    foreground,
    tilesheet,
  }: Config) {
    this.canvas = document.createElement("canvas");

    const context = this.canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Cannot get canvas context.");
    context.globalCompositeOperation = "destination-over";

    this.canvas.width = tileWidth * width;
    this.canvas.height = tileHeight * height;

    this.background = background;
    this.foreground = foreground;

    context.fillStyle = this.background;
    context.fillRect(0, 0, width * tileWidth, height * tileHeight);

    this.actualRenderer = new CanvasRenderer(
      context,
      tilesheet,
      tileWidth,
      tileHeight,
      this.background,
    );
  }

  draw = (point: Vector2, plan: RenderPlan) => {
    this.virtualRenderer.draw(point, plan);
  };

  drawText = (point: Vector2, content: string) => {
    const characters = content.split("");
    for (let i = 0; i < characters.length; i++) {
      this.draw(point.add(Vector2.from(i, 0)), {
        key: characters[i].toUpperCase(),
        background: this.background,
      });
    }
  };

  render = () => {
    this.virtualRenderer.commitTo(this.actualRenderer);
  };
}

export default Display;
