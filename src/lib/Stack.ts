export default class Stack<T> {
  private items: Array<T> = [];

  /**
   * @param items Initial items to include _in insertion order_.
   */
  constructor(items: Array<T> = []) {
    this.items = [...items.reverse()];
  }

  push(item: T): number {
    return this.items.unshift(item);
  }

  pop(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return !this.size();
  }

  size() {
    return this.items.length;
  }
}
