import 'phaser';

class Menu extends Phaser.Scene {
  constructor() {
    super('MENU');
  }
  init() {
    this.sound.pauseOnBlur = true;
    this.sound.volume = 0.2;
  }

  preload() {
    this.load.image('play', 'play.png');
  }

  create() {
    let play = this.add
      .image(320, 100, 'play')
      .setScale(1.5)
      .setOrigin(0.5, 0.5);

    play.setInteractive();
    play.on('pointerdown', e => {
      this.scene.start('HRA');
    });
    play.on('pointerover', e => {
      play.setTint(0x00ff00);
    });
    play.on('pointerout', e => {
      play.clearTint();
    });
  }
}
export { Menu };
