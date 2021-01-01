import Phaser from "phaser";

export default class Platform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "platform");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this, true); // second parameter is isStatic
  }

  destroy() {
    super.destroy();
  }
}
