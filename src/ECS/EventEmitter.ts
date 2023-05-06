import Event, { EventByName } from "./Event";

interface EventEmitter<E extends Event<unknown>> {
  on<N extends E["name"]>(
    name: N,
    handler: (event: EventByName<E, N>) => void,
  ): () => void;

  fireEvent(event: E): void;
}

export type Handler<E extends Event<unknown>> = (event: E) => void;

export type Subscribers<E extends Event<unknown>> = {
  [N in E["name"]]: Set<Handler<EventByName<E, N>>>;
};

export default EventEmitter;
