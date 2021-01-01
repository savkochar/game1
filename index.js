import Phaser from "phaser";
import { config } from "./settings/config.js";

setTimeout(() => {
  const game = new Phaser.Game(config);
}, 1000);
