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

    // this.facebook.once('startgame', this.startGame, this);
    // this.facebook.showLoadProgress(this);
    this.load.image('play', 'play.png');
    this.load.image('pause', 'pause.png');
    this.load.image('logo', 'logo.png');
    this.load.spritesheet('plr', 'char.png', { frameWidth: 256, frameHeight: 128 });
    this.load.image('board', 'thecircle.png');
    this.load.image('stone', 'stone.png');
    // console.log(this.game.scale.set);
  }
  startGame() {
    this.scene.start('MENU');
  }
}
export { FBpreload };
