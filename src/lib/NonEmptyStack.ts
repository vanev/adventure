import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import Stack from "./Stack";

export class ImpossibleState extends Error {}

export default class NonEmptyStack<T> extends Stack<T> {
  constructor(items: NonEmptyArray<T>) {
    super(items);
  }

  push(item: T): number {
    return super.push(item);
  }

  pop(): T {
    if (this.size() === 1)
      // TODO: Figure out something other than throwing an error in this case.
      throw new Error(`Cannot pop the last item of a ${this.constructor.name}`);

    const item = super.pop();

    if (!item) throw new ImpossibleState(`${this.constructor.name} is empty.`);

    return item;
  }

  peek(): T {
    const item = super.peek();

    if (!item) throw new ImpossibleState(`${this.constructor.name} is empty.`);

    return item;
  }

  isEmpty(): false {
    return false;
  }
}
