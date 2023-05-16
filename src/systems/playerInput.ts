import { millisecond } from "../lib/Duration";
import { system, query } from "../ECS";
import PlayerInput from "../components/PlayerInput";
import Commands from "../components/Commands";
import Keyboard from "../UI/Keyboard";
import Tick from "../Tick";

const REPEAT_DELAY = 200 * millisecond;

const playerCommandQuery = query({
  all: new Set([PlayerInput, Commands]),
});

const playerInput = <C>(keyboard: Keyboard) =>
  system(
    [playerCommandQuery],
    ([playerCommandResults]) =>
      ({ now, delta }: Tick) => {
        for (const [id, entity] of playerCommandResults()) {
          const keyMap = entity.getComponent(PlayerInput<C>).data;
          const commands = entity.getComponent(Commands<C>).data;

          for (const [key, pressedAt] of keyboard.pressed) {
            const command = keyMap[key];

            if (!command || commands.has(command)) continue;

            const timeSincePress = now - pressedAt;

            if (timeSincePress < delta || timeSincePress > REPEAT_DELAY)
              commands.set(command, performance.now());
          }
        }
      },
  );

export default playerInput;
