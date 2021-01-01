import Phaser from "phaser";

import Character from "../classes/Character.js";
import Platform from "../classes/Platform.js";
import Box from "../classes/Box.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    // Start UIScene, which will layer on top of PlayScene
    this.scene.run("UIScene");

    // Create background
    this.background = this.add.sprite(0, 0, "background").setOrigin(0, 0);
    this.physics.world.setBounds(
      0,
      0,
      this.background.width,
      this.background.height
    );

    this.player = new Character(this, 10, 0);
    this.boxes = [new Box(this, 100, 10), new Box(this, 200, 10)];

    // Set up special collision code for player and box to prevent box from getting stuck in corner
    // When you stand on top of a box, it will move in the opposite direction you're walking
    this.physics.add.collider(this.player, this.boxes, (player, box) => {
      // check if on top
      if (player.body.y < box.body.y - player.height) {
        box.setVelocity(-0.5 * player.body.velocity.x, 0);
      }
    });

    // Make all scene objects collide with all other scene objects
    let sceneObjects = [
      this.player,
      ...this.boxes, // Using the 'spread' operator
      new Platform(this, 270, 115),
      new Platform(this, 160, 80),
      new Platform(this, 60, 40)
    ];
    this.physics.add.collider(sceneObjects, sceneObjects);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );
    camera.startFollow(this.player);
  }

  update(time, delta) {
    this.player.update(time, delta);
  }
}
