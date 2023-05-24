import Vector2 from "../lib/Vector2";
import Renderer from "./Renderer";
import RenderPlan, { equals, removePlan } from "./RenderPlan";

class VirtualRenderer implements Renderer {
  current: Map<Vector2, RenderPlan> = new Map();
  changes: Map<Vector2, RenderPlan> = new Map();
  removals: Set<Vector2> = new Set();

  draw = (point: Vector2, plan: RenderPlan) => {
    this.removals.delete(point);

    const currentPlan = this.current.get(point);

    if (currentPlan && equals(plan, currentPlan)) {
      this.changes.delete(point);
    } else {
      this.changes.set(point, plan);
    }
  };

  commitTo = (actual: Renderer) => {
    for (const point of this.removals) {
      actual.draw(point, removePlan);

      this.current.delete(point);
    }

    for (const [point, plan] of this.changes) {
      actual.draw(point, plan);

      this.current.set(point, plan);
      this.changes.delete(point);
    }

    this.removals = new Set(this.current.keys());
  };
}

export default VirtualRenderer;
