import { query } from "../ECS";
import PlayerCommandComponent from "../components/PlayerCommands";

const playerInput = query({
  all: new Set([PlayerCommandComponent]),
});

export default playerInput;
