import Color from "../Color";
import Tilesheet from "../Tilesheet";
import CanvasRenderer from "./CanvasRenderer";
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

class Display {
  actualRenderer: CanvasRenderer;
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
    );
  }

  draw = (
    x: number,
    y: number,
    key: string,
    foreground: Color = this.foreground,
    background: Color = this.background,
  ) => {
    this.virtualRenderer.draw([x, y], { key, background });
  };

  drawText = (x: number, y: number, content: string) => {
    const characters = content.split("");
    for (let i = 0; i < characters.length; i++) {
      this.draw(x + i, y, characters[i].toUpperCase(), this.background);
    }
  };

  render = () => {
    this.virtualRenderer.commitTo(this.actualRenderer);
  };
}

export default Display;
