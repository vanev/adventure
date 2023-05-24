import Vector2 from "./lib/Vector2";

export type Config = {
  tileWidth: number;
  tileHeight: number;
  tileGap: number;
  columns: number;
  rows: number;
  tiles: Record<string, [number, number]>;
};

class Tilesheet {
  image: HTMLImageElement;
  private config: Config;

  get width() {
    return this.image.width;
  }
  get height() {
    return this.image.height;
  }

  get tileWidth() {
    return this.config.tileWidth;
  }
  get tileHeight() {
    return this.config.tileHeight;
  }
  get tileGap() {
    return this.config.tileGap;
  }

  get columns() {
    return this.config.columns;
  }
  get rows() {
    return this.config.rows;
  }

  get tiles() {
    return this.config.tiles;
  }

  constructor(image: HTMLImageElement, config: Config) {
    this.image = image;
    this.config = config;
  }

  findTile = (key: string): Vector2 | undefined => {
    const source = this.tiles[key];
    if (!source) return undefined;

    const [x, y] = source;

    return Vector2.from(
      x * this.tileWidth + this.tileGap,
      y * this.tileHeight + this.tileGap,
    );
  };
}

export default Tilesheet;
