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
      // this.facebook.saveStats({ score: window.game.data.score < this.score ? this.score : window.game.data.score });
      // this.facebook.incStats({ tries: 1 });
      this.facebook.on('getstats', data => {
        //  Handle the loaded data here
        this.facebook.saveStats({
          score: this.score >= data.score ? this.score : data.score,
          tries: data.tries >= 0 ? data.tries + 1 : 0,
        });
      });

      this.facebook.on('getstatsfail', function(error) {
        //  Handle what the game should do if the stats fail to load
      });

      this.facebook.getStats();

      // FBInstant.player.setDataAsync({
      //   score: Math.max(0, this.score),
      // });
    });
  }
}
export { HUD };
