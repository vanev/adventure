import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { Component } from "../ECS";

type MenuItem = {
  label: string;
  action: () => void;
};

type Menu = {
  selected: number;
  items: NonEmptyArray<MenuItem>;
};

export default class MenuComponent extends Component<Menu> {
  constructor(items: NonEmptyArray<MenuItem>) {
    super({ selected: 0, items });
  }
}
