import Game from "./Game";

const bodyElement = document.querySelector("body");
if (!bodyElement) throw new Error("Body Element Not Found");

const game = new Game(bodyElement);

game.start();
