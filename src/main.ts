import Color from "./Color";
import Game from "./Game";
import UI from "./UI";

const bodyElement = document.querySelector("body");
if (!bodyElement) throw new Error("Body Element Not Found");

const displayConfig = {
  width: 100,
  height: 40,
  fontSize: 16,
  fontFamily: "Fira Code, monospace",
  background: Color.DarkBlack,
  foreground: Color.LightWhite,
};

const ui = new UI(bodyElement, displayConfig);

const game = new Game(ui);

game.start();
