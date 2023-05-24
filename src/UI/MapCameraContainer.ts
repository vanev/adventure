import Matrix from "../lib/Matrix";
import Vector2 from "../lib/Vector2";
import RenderPlan from "../UI/RenderPlan";
import Camera from "../Camera";
import { Terrain } from "../World";
import BasicContainer from "./BasicContainer";
import Container from "./Container";

export type Config = {
  position: Vector2;
  size: Vector2;
  parent: Container;
  map: Matrix<Terrain>;
  focus: Vector2;
};

export default class MapCameraContainer implements Container {
  private container: BasicContainer;
  private camera: Camera<Terrain>;

  constructor({ position, size, parent, map, focus }: Config) {
    this.container = new BasicContainer({ position, size, parent });
    this.camera = new Camera({ subject: map, size, focus });
  }

  draw(point: Vector2, plan: RenderPlan): void {
    this.container.draw(point, plan);
  }

  drawText(point: Vector2, content: string): void {
    this.container.drawText(point, content);
  }

  drawMap(): void {
    for (let [point, terrain] of this.camera.cells()) {
      if (terrain) {
        this.draw(point, terrain);
      } else {
        this.draw(point, { key: " " });
      }
    }
  }

  drawOnMap(mapPoint: Vector2, plan: RenderPlan): void {
    if (!this.camera.isInView(mapPoint)) return;

    const cameraPoint = this.camera.toCameraPoint(mapPoint);
    this.draw(cameraPoint, plan);
  }
}
