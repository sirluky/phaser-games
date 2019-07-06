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
   FBInstant.updateAsync({
  action: 'CUSTOM',
  cta: 'Play',
  image: base64Picture,
  text: {
    default: 'Edgar just played BASH for 9 points!',
    localizations: {
      en_US: 'Edgar just played BASH for 9 points!',
      pt_BR: 'Edgar jogou BASH por 9 pontos!',
    }
  }
  template: 'HIGHSCORE',
  data: { myReplayData: '...' },
  strategy: 'IMMEDIATE',
  notification: 'NO_PUSH',
}).then(function() {
  console.log('Message was sent successfully');
});
      this.facebook.saveStats({
        score: Math.max(this.score, localStorage.getItem('cscore')),
      });
      this.facebook.once('incstats', function(data) {
        localStorage.setItem('tries', data.tries);
      });
      this.facebook.incStats({ tries: 1 });
    });

    FBInstant.getLeaderboardAsync('Score.' + FBInstant.context.getID())
      .then(leaderboard => {
        console.log(leaderboard.getName());
        return leaderboard.setScoreAsync(localStorage.getItem('cscore'), '{rank: "Master"}');
      })
      .then(() => console.log('Score saved'))
      .catch(error => console.error(error));
  }
}
export { HUD };
