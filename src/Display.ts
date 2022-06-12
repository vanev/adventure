import Color from "./Color";

type Config = {
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  background: Color;
  foreground: Color;
};

export class Display {
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  background: Color;
  foreground: Color;

  constructor(config: Config) {
    this.canvas = document.createElement("canvas");

    const context = this.canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Cannot get canvas context.");
    this.context = context;
    this.context.globalCompositeOperation = "destination-over";

    this.tileHeight = config.fontSize;

    // Measure the Typeface
    const testHeight = 100;
    this.context.font = `${testHeight}px ${config.fontFamily}`;
    const testWidth = Math.ceil(this.context.measureText("W").width);
    this.tileWidth = (this.tileHeight * testWidth) / testHeight;

    this.width = config.width;
    this.height = config.height;

    this.canvas.width = this.tileWidth * this.width;
    this.canvas.height = this.tileHeight * this.height;

    this.background = config.background;
    this.foreground = config.foreground;

    this.context.font = `${this.tileHeight}px ${config.fontFamily}`;
    this.context.textBaseline = "top";
  }

  getContainer = (): HTMLElement => {
    return this.canvas;
  };

  draw = (
    x: number,
    y: number,
    character: string,
    foreground?: Color,
    background?: Color,
  ) => {
    this.context.fillStyle = background || this.background;
    this.context.fillRect(
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    );
    this.context.fillStyle = foreground || this.foreground;
    this.context.fillText(
      character,
      x * this.tileWidth,
      Math.ceil(y * this.tileHeight),
    );
  };

  drawText = (x: number, y: number, content: string) => {
    this.context.fillStyle = this.background;
    this.context.fillRect(
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    );
    this.context.fillStyle = this.foreground;
    this.context.fillText(
      content,
      x * this.tileWidth,
      Math.ceil(y * this.tileHeight),
    );
  };

  drawOver = (
    x: number,
    y: number,
    character: string,
    foreground?: Color,
    background?: Color,
  ) => {
    this.context.fillStyle = background || this.background;
    this.context.fillRect(
      x * this.tileWidth,
      y * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
    );
    this.context.fillStyle = foreground || this.foreground;
    this.context.fillText(
      character,
      x * this.tileWidth,
      Math.ceil(y * this.tileHeight),
    );
  };

  clear = () => {
    this.context.fillStyle = this.background;
    this.context.fillRect(
      0,
      0,
      this.width * this.tileWidth,
      this.height * this.tileHeight,
    );
  };
}

const DISPLAY_CONFIG = {
  width: 100,
  height: 40,
  fontSize: 16,
  fontFamily: "Fira Code, monospace",
  background: Color.DarkBlack,
  foreground: Color.LightWhite,
};

export const initialize = (parent: HTMLElement): Display => {
  const display = new Display(DISPLAY_CONFIG);

  const container = display.getContainer();
  if (!container) throw new Error("Display Container Element Not Found");

  parent.appendChild(container);

  return display;
};
