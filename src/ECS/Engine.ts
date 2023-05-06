import { Id } from "../lib/Id";
import Entity from "./Entity";
import { System, Update } from "./System";
import Event, { EventByName } from "./Event";
import EventEmitter, { Subscribers, Handler } from "./EventEmitter";

export class EntityComponentAddEvent extends Event<[Entity, Function]> {
  name = "entitycomponentadd" as const;
}

export class EntityComponentRemoveEvent extends Event<[Entity, Function]> {
  name = "entitycomponentremove" as const;
}

export class EntityDestroyEvent extends Event<Id> {
  name = "entitydestroy" as const;
}

type EngineEvent =
  | EntityComponentAddEvent
  | EntityComponentRemoveEvent
  | EntityDestroyEvent;

class Engine<T> implements EventEmitter<EngineEvent> {
  private nextEntityId: number = 0;
  private entities: Map<Id, Entity> = new Map();
  private systems: Map<System<T>, Update<T>> = new Map();

  createEntity = (): Entity => {
    const entity = new Entity(this.nextEntityId++);
    this.entities.set(entity.id, entity);

    entity.on("componentadd", (event) => {
      this.fireEvent(new EntityComponentAddEvent([entity, event.payload]));
    });

    entity.on("componentremove", (event) => {
      this.fireEvent(new EntityComponentAddEvent([entity, event.payload]));
    });

    return entity;
  };

  getEntity = (id: Id): Entity | undefined => {
    return this.entities.get(id);
  };

  destroyEntity = (id: Id) => {
    const existed = this.entities.delete(id);

    if (existed) {
      this.fireEvent(new EntityDestroyEvent(id));
    }
  };

  addSystem = (system: System<T>) => {
    this.systems.set(system, system(this));
  };

  removeSystem = (system: System<T>) => {
    this.systems.delete(system);
  };

  update = (t: T) => {
    for (const [_, system] of this.systems) {
      system(t);
    }
  };

  //
  // EventEmitter
  //

  private subscribers: Subscribers<EngineEvent> = {
    entitycomponentadd: new Set(),
    entitycomponentremove: new Set(),
    entitydestroy: new Set(),
  };

  on = <N extends EngineEvent["name"]>(
    eventName: N,
    handler: Handler<EventByName<EngineEvent, N>>,
  ) => {
    this.subscribers[eventName].add(handler);

    return () => {
      this.subscribers[eventName].delete(handler);
    };
  };

  fireEvent = (event: EngineEvent) => {
    for (const handler of this.subscribers[event.name]) {
      // TODO: Figure out why this typecheck isn't working.
      // @ts-expect-error
      handler(event);
    }
  };
}

export default Engine;
