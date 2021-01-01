import Phaser from "phaser";

export default class Box extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "box");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);

    // Add to physics engine, and customize settings
    this.sprite = scene.physics.add
      .existing(this)
      .setMaxVelocity(200, 200)
      .setBounce(0.2, 0.2)
      .setDrag(150, 100)
      .setFriction(150, 100)
      .setCollideWorldBounds(true);
  }
}
