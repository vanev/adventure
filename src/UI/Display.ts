import Color from "../Color";

type Plan = {
  content: string;
  background: Color;
  foreground: Color;
};

const equals = (a: Plan, b: Plan): boolean =>
  a.content === b.content &&
  a.background === b.background &&
  a.foreground === b.foreground;

const toKey = (x: number, y: number): string => `${x},${y}`;
const fromKey = (key: string): [number, number] => {
  const [x, y] = key.split(",");
  return [parseInt(x, 10), parseInt(y, 10)];
};

export type Config = {
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  background: Color;
  foreground: Color;
};

class Display {
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  background: Color;
  foreground: Color;
  changes: Record<string, Plan> = {};
  current: Record<string, Plan> = {};
  removals: Set<string> = new Set();

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
    this.tileWidth = Math.ceil((config.fontSize * testWidth) / testHeight);

    this.width = config.width;
    this.height = config.height;

    this.canvas.width = this.tileWidth * this.width;
    this.canvas.height = this.tileHeight * this.height;

    this.background = config.background;
    this.foreground = config.foreground;

    this.context.font = `${this.tileHeight}px ${config.fontFamily}`;
    this.context.textBaseline = "top";

    this.context.fillStyle = this.background;
    this.context.fillRect(
      0,
      0,
      this.width * this.tileWidth,
      this.height * this.tileHeight,
    );
  }

  getContainer = (): HTMLElement => {
    return this.canvas;
  };

  draw = (
    x: number,
    y: number,
    content: string,
    foreground: Color = this.foreground,
    background: Color = this.background,
  ) => {
    const key = toKey(x, y);
    this.removals.delete(key);
    const plan = { content, foreground, background };
    const currentPlan = this.current[key];
    if (currentPlan && equals(plan, currentPlan)) {
      delete this.changes[key];
    } else {
      this.changes[key] = plan;
    }
  };

  drawText = (x: number, y: number, content: string) => {
    const characters = content.split("");
    for (let i = 0; i < characters.length; i++) {
      this.draw(x + i, y, characters[i], this.foreground, this.background);
    }
  };

  drawOver = (
    x: number,
    y: number,
    content: string,
    foreground: Color = this.foreground,
    background: Color = this.background,
  ) => {
    this.draw(x, y, content, foreground, background);
  };

  render = () => {
    for (const key of this.removals) {
      const [x, y] = fromKey(key);

      const current = this.current[key];

      let length = current ? current.content.length : 1;
      length = length > 1 ? length + 1 : length;

      this.context.fillStyle = this.background;
      this.context.fillRect(
        x * this.tileWidth,
        y * this.tileHeight,
        this.tileWidth * length,
        this.tileHeight,
      );

      delete this.current[key];
    }

    for (const [key, instruction] of Object.entries(this.changes)) {
      const [x, y] = fromKey(key);

      const current = this.current[key];

      let length = current ? current.content.length : 1;
      length = length > 1 ? length + 1 : length;

      this.context.fillStyle = instruction.background;
      this.context.fillRect(
        x * this.tileWidth,
        y * this.tileHeight,
        this.tileWidth * length,
        this.tileHeight,
      );
      this.context.fillStyle = instruction.foreground;
      this.context.fillText(
        instruction.content,
        x * this.tileWidth,
        y * this.tileHeight,
      );

      this.current[key] = instruction;
      delete this.changes[key];
    }

    this.removals = new Set(Object.keys(this.current));
  };
}

export default Display;
