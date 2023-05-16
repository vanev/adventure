import { query, system } from "../ECS";
import Commands from "../components/Commands";
import Tick from "../Tick";
import MenuComponent from "../components/Menu";

type SelectPreviousMenuItem = { type: "selectPreviousMenuItem" };
export const selectPreviousMenuItem: SelectPreviousMenuItem = {
  type: "selectPreviousMenuItem",
};

type SelectNextMenuItem = { type: "selectNextMenuItem" };
export const selectNextMenuItem: SelectNextMenuItem = {
  type: "selectNextMenuItem",
};

type PerformSelectedAction = { type: "performSelectedAction" };
export const performSelectedAction: PerformSelectedAction = {
  type: "performSelectedAction",
};

export type MenuCommand =
  | SelectPreviousMenuItem
  | SelectNextMenuItem
  | PerformSelectedAction;

const menuControlQuery = query({
  all: new Set([MenuComponent, Commands]),
});

const menuControlSystem = system(
  [menuControlQuery],
  ([menuControlResults]) =>
    (tick: Tick) => {
      for (const [id, entity] of menuControlResults()) {
        const menu = entity.getComponent(MenuComponent);
        const commands = entity.getComponent(Commands<MenuCommand>).data;

        if (commands.has(selectNextMenuItem)) {
          menu.data.selected++;

          if (menu.data.selected > menu.data.items.length - 1) {
            menu.data.selected = 0;
          }

          commands.delete(selectNextMenuItem);
        }

        if (commands.has(selectPreviousMenuItem)) {
          menu.data.selected--;

          if (menu.data.selected < 0) {
            menu.data.selected = menu.data.items.length - 1;
          }

          commands.delete(selectPreviousMenuItem);
        }

        if (commands.has(performSelectedAction)) {
          menu.data.items[menu.data.selected].action();

          commands.delete(performSelectedAction);
        }
      }
    },
);

export default menuControlSystem;
