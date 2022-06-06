import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import Screen from "./screens/Screen";

export type Item<S extends Screen> = {
  label: string;
  action: (screen: S) => void;
};

class Menu<S extends Screen> {
  items: NonEmptyArray<Item<S>>;
  selected: number = 0;

  constructor(items: NonEmptyArray<Item<S>>) {
    this.items = items;
  }

  up = () => {
    this.selected -= 1;
    if (this.selected < 0) this.selected = this.items.length - 1;
  };

  down = () => {
    this.selected += 1;
    if (this.selected >= this.items.length) this.selected = 0;
  };

  action = () => {
    return this.items[this.selected].action;
  };

  forEach = (
    iterator: (item: Item<S>, selected: boolean, index: number) => void,
  ) => {
    this.items.forEach((item, index) => {
      iterator(item, this.selected === index, index);
    });
  };
}

export default Menu;
