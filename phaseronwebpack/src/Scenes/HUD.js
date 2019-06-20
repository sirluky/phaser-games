import 'phaser';
import { emmiter } from '../GlobalFunc';

class HUD extends Phaser.Scene {
  constructor() {
    super('HUD');
  }
  init() {
    this.score = 0;
  }

  preload() {
    // this.load.image('pause', 'pause.png');
  }

  create() {
    // this.add.text(this.game.scale.gameSize.width, 0, 'pause').setOrigin(1, 0);

    // this.add
    //   .image(this.game.scale.gameSize.width, 15, 'pause')
    //   .setOrigin(1, 0)
    //   .setScale(0.09)
    //   .setTintFill(0xffffff);
    // this.add.text(this.game.scale.gameSize.width, 0, 'score').setOrigin(0.5);
    let scoretext = this.add.text(5, 5, this.score, { fontSize: 50 }).setOrigin(0);

    emmiter.on('ScoreUp', score => {
      this.score += score;
      scoretext.setText('' + this.score);
    });

    this.events.on('shutdown', () => {
      emmiter.off('ScoreUp');

      // FBInstant.player.setDataAsync({
      //   score: Math.max(0, this.score),
      // });
    });
  }
}
export { HUD };
