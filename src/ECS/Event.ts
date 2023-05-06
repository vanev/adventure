abstract class Event<P, N = string> {
  abstract name: N;
  payload: P;

  constructor(payload: P) {
    this.payload = payload;
  }
}

export type EventClass<T extends Event<unknown>> = new (...args: any[]) => T;

export type EventByName<
  E extends Event<unknown>,
  N extends E["name"],
> = E extends {
  name: N;
}
  ? E
  : never;

export default Event;
