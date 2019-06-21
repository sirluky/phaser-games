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
    this.load.image('logo', 'game logo.png');
    this.load.spritesheet('plr', 'char.png', { frameWidth: 256, frameHeight: 128 });
    this.load.spritesheet('stone', 'astone.png', { frameWidth: 32 });
    this.load.image('board', 'circle.svg');
    // this.load.image('board', 'thecircle.png');
  }
  async startGame() {
    const LoadedData = await new Promise((resolve, reject) => {
      this.facebook.once('getstats', data => {
        if (data.score >= 0 && data.tries >= 0) {
          console.log('score je nacteno', data.score);
        } else {
          data.score = 0;
          data.tries = 0;
        }
        resolve(data);
        // this.BestScoreText.setText('' + data.score);
        // this.TriesText.setText('' + data.tries);
      });
      this.facebook.getStats();
    });

    //('score', LoadedData);
    localStorage.setItem('score', LoadedData.score);
    this.scene.start('MENU');
  }
}
export { FBpreload };
