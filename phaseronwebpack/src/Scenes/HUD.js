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
      localStorage.setItem('cscore', this.score);
    });

    this.events.on('shutdown', () => {
      emmiter.off('ScoreUp');
      let cscore = localStorage.getItem('cscore');
      if (cscore > localStorage.getItem('score')) {
        localStorage.setItem('score', cscore);
      }
      this.facebook.saveStats({
        score: Math.max(this.score, localStorage.getItem('cscore')),
      });
      this.facebook.once('incstats', function(data) {
        localStorage.setItem('tries', data.tries);
      });
      this.facebook.incStats({ tries: 1 });
    });
  }
}
export { HUD };
