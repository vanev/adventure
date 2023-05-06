import Key from "../lib/Key";

class Keyboard {
  pressed: Map<Key, number> = new Map();

  constructor() {
    window.addEventListener("keydown", (event) => {
      const key = event.key as Key;

      if (this.pressed.has(key)) return;

      this.pressed.set(key, performance.now());
    });

    window.addEventListener("keyup", (event) => {
      const key = event.key as Key;

      this.pressed.delete(key);
    });
  }
}

export default Keyboard;
