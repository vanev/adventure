class Keyboard {
  pressed: Set<string> = new Set();

  constructor() {
    window.addEventListener("keydown", (event) => {
      this.pressed.add(event.key);
    });
  }

  clear = () => {
    this.pressed.clear();
  };
}

export default Keyboard;
