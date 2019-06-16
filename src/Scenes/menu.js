import 'phaser';

class Menu extends Phaser.Scene {
  constructor() {
    super('MENU');
  }
  init() {}

  preload() {
    this.facebook.once('startgame', this.startGame, this);
    this.facebook.showLoadProgress(this);
    this.load.image('play', 'play.png');
    this.load.image('logo', 'logo.png');
  }

  create() {
    this.sound.pauseOnBlur = true;
    this.sound.volume = 0.2;
    // setTimeout(() => this.scene.start('PLAY'), 500);

    let logo = this.add
      .image(this.game.scale.gameSize.width / 2, 50, 'logo')
      .setScale(this.game.scale.gameSize.width / 640)
      .setOrigin(0.5, 0);
    let play = this.add
      .image(this.game.scale.gameSize.width / 2, (this.game.scale.gameSize.height / 4) * 3, 'play')
      .setOrigin(0.5, 0.5)
      .setScale(this.game.scale.gameSize.width / 300);

    play.setInteractive();
    console.log(this.cameras.main);

    play.on('pointerdown', e => {
      // this.cameras.main.shake(300, 0.01);
      this.cameras.main.pan(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height, 1000, 'Sine');
      // this.cameras.main.setAlpha(0.1);
      this.cameras.main.fadeOut(500, 131, 85, 48);
      setTimeout(() => this.scene.start('PLAY'), 500);

      // this.cameras.main.scrollY = 200;
      // this.cameras.main.setPosition(0, this.game.scale.gameSize.height);
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
