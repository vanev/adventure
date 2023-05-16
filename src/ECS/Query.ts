import { Id } from "../lib/Id";
import Entity from "./Entity";
import Engine, {
  EntityComponentAddEvent,
  EntityComponentRemoveEvent,
  EntityDestroyEvent,
} from "./Engine";

export type Facet = Set<Function>;

export interface Facets {
  any: Facet;
  all: Facet;
  none: Facet;
}

export type Results = () => Map<Id, Entity>;

export type Query = <T>(engine: Engine<T>) => Results;

export type QueryBuilder = (facets: Partial<Facets>) => Query;

export const query: QueryBuilder =
  ({ any = new Set(), all = new Set(), none = new Set() }) =>
  (engine) => {
    const matches: Map<Id, Entity> = new Map();

    const handleEntityComponentAdd = (event: EntityComponentAddEvent) => {
      const [entity, component] = event.payload;

      // TODO: We can optimize this to see if we even care about the component, first.
      if (
        entity.hasAllComponents(all) &&
        entity.hasAnyComponents(any) &&
        entity.hasNoneComponents(none)
      ) {
        matches.set(entity.id, entity);
      }
    };

    const handleEntityComponentRemove = (event: EntityComponentRemoveEvent) => {
      const [entity, component] = event.payload;

      // TODO: We can optimize this to see if we even care about the component, first.
      if (
        !entity.hasAllComponents(all) ||
        !entity.hasAnyComponents(any) ||
        !entity.hasNoneComponents(none)
      ) {
        matches.delete(entity.id);
      }
    };

    const handleEntityDestroy = (event: EntityDestroyEvent) => {
      matches.delete(event.payload);
    };

    engine.on("entitycomponentadd", handleEntityComponentAdd);
    engine.on("entitycomponentremove", handleEntityComponentRemove);
    engine.on("entitydestroy", handleEntityDestroy);

    for (const entity of engine.allEntities()) {
      if (
        entity.hasAllComponents(all) &&
        entity.hasAnyComponents(any) &&
        entity.hasNoneComponents(none)
      ) {
        matches.set(entity.id, entity);
      }
    }

    return () => matches;
  };
