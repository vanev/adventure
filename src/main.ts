import tilemapSrc from "url:../assets/tilemap.png";
import * as tilemapData from "../data/tilemap.json";

import Color from "./Color";
import Application from "./Application";
import Tilesheet, { Config } from "./Tilesheet";
import UI from "./UI";

const bodyElement = document.querySelector("body");
if (!bodyElement) throw new Error("Body Element Not Found");

const image = new Image();
image.src = tilemapSrc;

image.onload = () => {
  const tilesheet = new Tilesheet(image, tilemapData as unknown as Config);

  const displayConfig = {
    width: 60,
    height: 40,
    tileWidth: 16,
    tileHeight: 16,
    background: Color.DarkBlack,
    foreground: Color.LightWhite,
    tilesheet,
  };

  const ui = new UI(bodyElement, displayConfig);

  const game = new Application(ui);

  game.start();
};
