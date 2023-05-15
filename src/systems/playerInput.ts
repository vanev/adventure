import { millisecond } from "../lib/Duration";
import { system } from "../ECS";
import PlayerCommandComponent from "../components/PlayerCommands";
import playerCommandQuery from "../queries/playerCommand";
import Keyboard from "../UI/Keyboard";
import Tick from "../Tick";

const REPEAT_DELAY = 200 * millisecond;

const playerInput = <C>(keyboard: Keyboard) =>
  system(
    [playerCommandQuery],
    ([playerCommandResults]) =>
      ({ now, delta }: Tick) => {
        for (const [id, entity] of playerCommandResults()) {
          const playerCommand = entity.getComponent(PlayerCommandComponent<C>);
          const { keyMap, commands } = playerCommand.data;

          for (const [key, pressedAt] of keyboard.pressed) {
            const command = keyMap[key];

            if (!command) return;

            if (commands.has(command)) return;

            const timeSincePress = now - pressedAt;

            if (timeSincePress < delta || timeSincePress > REPEAT_DELAY)
              commands.set(command, performance.now());
          }
        }
      },
  );

export default playerInput;
