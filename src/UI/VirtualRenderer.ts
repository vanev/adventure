import Vector2, { fromKey, toKey } from "../lib/Vector2";
import Renderer from "./Renderer";
import RenderPlan, { equals, removePlan } from "./RenderPlan";

class VirtualRenderer implements Renderer {
  current: Record<string, RenderPlan> = {};
  changes: Record<string, RenderPlan> = {};
  removals: Set<string> = new Set();

  draw = (point: Vector2, plan: RenderPlan) => {
    const key = toKey(point);
    this.removals.delete(key);

    const currentPlan = this.current[key];

    if (currentPlan && equals(plan, currentPlan)) {
      delete this.changes[key];
    } else {
      this.changes[key] = plan;
    }
  };

  commitTo = (actual: Renderer) => {
    for (const key of this.removals) {
      const point = fromKey(key);

      actual.draw(point, removePlan);

      delete this.current[key];
    }

    for (const [key, plan] of Object.entries(this.changes)) {
      const point = fromKey(key);

      actual.draw(point, plan);

      this.current[key] = plan;
      delete this.changes[key];
    }

    this.removals = new Set(Object.keys(this.current));
  };
}

export default VirtualRenderer;
