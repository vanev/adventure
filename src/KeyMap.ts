import Key from "./lib/Key";

type KeyMap<C> = Partial<Record<Key, C>>;

export default KeyMap;
