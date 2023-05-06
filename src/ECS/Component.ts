class Component<D> {
  data: D;

  constructor(data: D) {
    this.data = data;
  }
}

export type ComponentClass<T extends Component<unknown>> = new (
  ...args: any[]
) => T;

export default Component;
