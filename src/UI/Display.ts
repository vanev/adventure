import Color from "../Color";
import CanvasRenderer from "./CanvasRenderer";
import VirtualRenderer from "./VirtualRenderer";

export type Config = {
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  background: Color;
  foreground: Color;
};

class Display {
  actualRenderer: CanvasRenderer;
  virtualRenderer: VirtualRenderer = new VirtualRenderer();
  canvas: HTMLCanvasElement;
  background: Color;
  foreground: Color;

  constructor({
    fontSize,
    fontFamily,
    width,
    height,
    background,
    foreground,
  }: Config) {
    this.canvas = document.createElement("canvas");

    const context = this.canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Cannot get canvas context.");
    context.globalCompositeOperation = "destination-over";

    const tileHeight = fontSize;

    // Measure the Typeface
    const testHeight = 100;
    context.font = `${testHeight}px ${fontFamily}`;
    const testWidth = Math.ceil(context.measureText("W").width);
    const tileWidth = Math.ceil((fontSize * testWidth) / testHeight);

    this.canvas.width = tileWidth * width;
    this.canvas.height = tileHeight * height;

    this.background = background;
    this.foreground = foreground;

    context.font = `${tileHeight}px ${fontFamily}`;
    context.textBaseline = "top";

    context.fillStyle = this.background;
    context.fillRect(0, 0, width * tileWidth, height * tileHeight);

    this.actualRenderer = new CanvasRenderer(context, tileWidth, tileHeight);
  }

  draw = (
    x: number,
    y: number,
    content: string,
    foreground: Color = this.foreground,
    background: Color = this.background,
  ) => {
    this.virtualRenderer.draw([x, y], { content, foreground, background });
  };

  drawText = (x: number, y: number, content: string) => {
    const characters = content.split("");
    for (let i = 0; i < characters.length; i++) {
      this.draw(x + i, y, characters[i], this.foreground, this.background);
    }
  };

  render = () => {
    this.virtualRenderer.commitTo(this.actualRenderer);
  };
}

export default Display;
