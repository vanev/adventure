import * as Matrix from "~/src/lib/Matrix";
import { query, system } from "~/src/ECS";
import Tick from "~/src/Tick";
import Position from "~/src/components/Position";
import Commands from "~/src/components/Commands";
import Location from "~/src/components/Location";
import Ground from "~/src/components/Ground";
import Vector2 from "~/src/lib/Vector2";

type MoveNorth = { type: "MoveNorth" };
export const moveNorth: MoveNorth = { type: "MoveNorth" };

type MoveWest = { type: "MoveWest" };
export const moveWest: MoveWest = { type: "MoveWest" };

type MoveSouth = { type: "MoveSouth" };
export const moveSouth: MoveSouth = { type: "MoveSouth" };

type MoveEast = { type: "MoveEast" };
export const moveEast: MoveEast = { type: "MoveEast" };

export type MovementCommand = MoveNorth | MoveWest | MoveSouth | MoveEast;

const movementQuery = query({
  all: new Set([Position, Commands, Location]),
});

const movement = system(
  [movementQuery],
  ([movementResults]) =>
    (tick: Tick) => {
      for (const [id, entity] of movementResults()) {
        const commands = entity.getComponent(Commands<MovementCommand>).data;
        const positionComponent = entity.getComponent(Position);
        const [x, y] = positionComponent.data;
        const location = entity.getComponent(Location).data;

        const ground = location.getComponent(Ground).data;

        const original: Vector2 = [x, y];
        const updated: Vector2 = [x, y];

        if (commands.has(moveNorth)) {
          updated[1] -= 1;
          commands.delete(moveNorth);
        }

        if (commands.has(moveSouth)) {
          updated[1] += 1;
          commands.delete(moveSouth);
        }

        if (commands.has(moveEast)) {
          updated[0] += 1;
          commands.delete(moveEast);
        }

        if (commands.has(moveWest)) {
          updated[0] -= 1;
          commands.delete(moveWest);
        }

        const destination = Matrix.get(updated)(ground);

        if (!destination) {
          positionComponent.data = original;
        } else {
          positionComponent.data = updated;
        }
      }
    },
);

export default movement;
