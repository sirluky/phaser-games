import 'phaser';

class FBpreload extends Phaser.Scene {
  constructor() {
    super('FBpreload');
  }
  init() {}

  preload() {
    this.game.scale.gameSize.setAspectRatio(1);

    console.log('fb', this.facebook);
    console.log('pls');

    this.facebook.once('startgame', this.startGame, this);
    this.facebook.showLoadProgress(this);

    this.load.image('play', 'play.png');
    this.load.image('pause', 'pause.png');
    this.load.image('logo', 'logo.png');
    this.load.spritesheet('plr', 'char.png', { frameWidth: 256, frameHeight: 128 });
    this.load.spritesheet('stone', 'astone.png', { frameWidth: 32 });
    this.load.image('board', 'circle.svg');
    // this.load.image('board', 'thecircle.png');
  }
  startGame() {
    this.scene.start('MENU');
  }
}
export { FBpreload };
