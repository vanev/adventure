import Vector2 from "../lib/Vector2";
import RenderPlan from "./RenderPlan";

interface Renderer {
  draw(point: Vector2, plan: RenderPlan): void;
}

export default Renderer;
