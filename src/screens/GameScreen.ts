import Matrix from "~/src/lib/Matrix";
import Vector2 from "~/src/lib/Vector2";
import { query, system } from "~/src/ECS";
import Display from "~/src/UI/Display";
import Tick from "~/src/Tick";
import Screen from "~/src/Screen";
import playerInput from "~/src/systems/playerInput";
import Position from "~/src/components/Position";
import Size from "~/src/components/Size";
import MapCameraContainer from "~/src/UI/MapCameraContainer";
import CameraFocus from "~/src/components/CameraFocus";
import Renderable from "~/src/components/Renderable";
import Ground from "~/src/components/Ground";
import movement from "~/src/systems/movement";
import { Terrain } from "~/src/World";
import { grass } from "~/src/World/Terrain";
import PlayerInput from "~/src/components/PlayerInput";
import KeyMap from "~/src/KeyMap";
import Key from "~/src/lib/Key";
import Commands from "~/src/components/Commands";
import {
  moveEast,
  moveNorth,
  moveSouth,
  moveWest,
  MovementCommand,
} from "~/src/systems/movement";
import Location from "~/src/components/Location";

const keyMap: KeyMap<MovementCommand> = {
  [Key.w]: moveNorth,
  [Key.a]: moveWest,
  [Key.s]: moveSouth,
  [Key.d]: moveEast,
};

const fociQuery = query({
  all: new Set([CameraFocus]),
});

const renderablesQuery = query({
  all: new Set([Position, Renderable]),
});

const groundQuery = query({
  all: new Set([Position, Location, Size]),
});

const mapRender = (display: Display) =>
  system(
    [fociQuery, groundQuery, renderablesQuery],
    ([fociResults, cameraResults, renderablesResults]) =>
      (tick: Tick) => {
        const [[cameraId, cameraEntity]] = cameraResults();
        const [[focusId, focusEntity]] = fociResults();
        const locationEntity = cameraEntity.getComponent(Location).data;

        const mapContainer = new MapCameraContainer({
          position: cameraEntity.getComponent(Position).data,
          size: cameraEntity.getComponent(Size).data,
          parent: display,
          map: locationEntity.getComponent(Ground).data,
          focus: focusEntity.getComponent(Position).data,
        });

        mapContainer.drawMap();

        for (const [renderableId, renderableEntity] of renderablesResults()) {
          const position = renderableEntity.getComponent(Position);
          const renderable = renderableEntity.getComponent(Renderable);
          mapContainer.drawOnMap(position.data, renderable.data);
        }
      },
  );

export default class GameScreen extends Screen {
  playerInputSystem = playerInput(this.application.ui.keyboard);
  mapRenderSystem = mapRender(this.application.ui.display);

  enter = () => {
    this.engine.addSystem(this.playerInputSystem);
    this.engine.addSystem(this.mapRenderSystem);
    this.engine.addSystem(movement);

    const terrain = Matrix.fromSize<Terrain>(Vector2.from(200, 200)).fill(
      grass,
    );

    const location = this.engine.createEntity();
    location.addComponent(new Ground(terrain));

    const playerCharacter = this.engine.createEntity();
    playerCharacter.addComponent(new CameraFocus());
    playerCharacter.addComponent(new Location(location));
    playerCharacter.addComponent(new Position(Vector2.from(1, 1)));
    playerCharacter.addComponent(new Renderable("guy1"));
    playerCharacter.addComponent(new PlayerInput(keyMap));
    playerCharacter.addComponent(new Commands());

    const camera = this.engine.createEntity();
    camera.addComponent(new Location(location));
    camera.addComponent(new Position(Vector2.from(0, 0)));
    camera.addComponent(new Size(Vector2.from(50, 30)));
  };
}
