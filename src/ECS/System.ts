import { Query, Results } from "./Query";
import Engine from "./Engine";

export type Updater<T> = (results: [...Array<Results>]) => (t: T) => void;

export type Update<T> = (t: T) => void;

export type System<T> = (engine: Engine<T>) => Update<T>;

export type SystemBuilder = <T>(
  queries: [...Array<Query>],
  update: Updater<T>,
) => System<T>;

export const system: SystemBuilder =
  (queryInitializers, update) => (engine) => {
    const queries = queryInitializers.map((initializer) => initializer(engine));
    return update(queries);
  };

export default System;
