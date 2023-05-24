import { Id } from "../lib/Id";
import Event, { EventByName } from "./Event";
import EventEmitter, { Subscribers, Handler } from "./EventEmitter";
import Component, { ComponentClass } from "./Component";

export class ComponentAddEvent extends Event<Function> {
  name = "componentadd" as const;
}

export class ComponentRemoveEvent extends Event<Function> {
  name = "componentremove" as const;
}

type EntityEvent = ComponentAddEvent | ComponentRemoveEvent;

class Entity implements EventEmitter<EntityEvent> {
  id: Id;
  private components: Map<Function, Component<unknown>> = new Map();

  constructor(id: Id) {
    this.id = id;
  }

  addComponent = (component: Component<unknown>) => {
    this.components.set(component.constructor, component);

    this.fireEvent(new ComponentAddEvent(component.constructor));
  };

  getComponent = <C extends Component<unknown>>(
    clazz: ComponentClass<C>,
  ): C => {
    const component = this.components.get(clazz);

    if (!component)
      throw new Error(`Cannot get ${clazz.name} for entity ${this.id}.`);

    if (!(component instanceof clazz))
      throw new Error(`Incorrect class for ${component}.`);

    return component;
  };

  hasComponent = (clazz: Function): boolean => {
    return this.components.has(clazz);
  };

  hasAllComponents = (classes: Iterable<Function>): boolean => {
    for (const clazz of classes) {
      if (!this.hasComponent(clazz)) {
        return false;
      }
    }
    return true;
  };

  hasAnyComponents = (classes: Iterable<Function>): boolean => {
    for (const clazz of classes) {
      if (!this.hasComponent(clazz)) {
        return true;
      }
    }
    return true;
  };

  hasNoneComponents = (classes: Iterable<Function>): boolean => {
    for (const clazz of classes) {
      if (this.hasComponent(clazz)) {
        return false;
      }
    }
    return true;
  };

  removeComponent = (clazz: Function) => {
    this.components.delete(clazz);

    this.fireEvent(new ComponentRemoveEvent(clazz));
  };

  //
  // EventEmitter
  //

  private subscribers: Subscribers<EntityEvent> = {
    componentadd: new Set(),
    componentremove: new Set(),
  };

  on = <N extends EntityEvent["name"]>(
    eventName: N,
    handler: Handler<EventByName<EntityEvent, N>>,
  ) => {
    this.subscribers[eventName].add(handler);

    return () => {
      this.subscribers[eventName].delete(handler);
    };
  };

  fireEvent = (event: EntityEvent) => {
    for (const handler of this.subscribers[event.name]) {
      // TODO: Figure out why this typecheck isn't working.
      // @ts-expect-error
      handler(event);
    }
  };
}

export default Entity;
