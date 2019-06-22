import 'phaser';

class Menu extends Phaser.Scene {
  constructor() {
    super('MENU');
  }
  init(data) {
    this.played = data['played'];
  }

  preload() {
    // console.log('fb', this.facebook);
    // console.log('pls');
    // this.facebook.once('startgame', this.startGame, this);
    // this.facebook.showLoadProgress(this);

    // this.facebook.once('startgame', this.startGame, this);
    // this.facebook.showLoadProgress(this);
    const profile = FBInstant.player.getPhoto();
    this.load.image('play', 'play.png');
    this.load.image('logo', 'game logo.png');
    this.load.image('profile', profile);
  }

  create() {
    FBInstant.getLeaderboardAsync('Score.' + FBInstant.context.getID())
      .then(leaderboard => leaderboard.getEntriesAsync(10, 0))
      .then(entries => {
        for (var i = 0; i < entries.length; i++) {
          console.log(entries[i].getRank() + '. ' + entries[i].getPlayer().getName() + ': ' + entries[i].getScore());
        }
      })
      .catch(error => console.error(error));

    const { score, cscore } = {
      score: localStorage.getItem('score'),
      cscore: localStorage.getItem('cscore'),
    };
    this.add.text(this.game.scale.gameSize.width - 190, 20, 'Best:', { fontSize: 30 }).setOrigin(0, 0);
    let BestScoreText = this.add
      .text(this.game.scale.gameSize.width - 90, 15, `${score >= cscore ? score : cscore}`, {
        fontSize: 40,
      })
      .setOrigin(0, 0);
    if (this.played) {
      this.add
        .text(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 2 + 15, 'Score:', {
          fontSize: 40,
        })
        .setOrigin(1, 0);
      let ScoreText = this.add
        .text(this.game.scale.gameSize.width / 2 + 20, this.game.scale.gameSize.height / 2 + 15, cscore, {
          fontSize: 40,
        })
        .setOrigin(0, 0);
    } else {
    }

    FBInstant.getLeaderboardAsync('Score.' + FBInstant.context.getID())
      .then(leaderboard => {
        console.log(leaderboard.getName());
        return leaderboard.setScoreAsync(localStorage.getItem('score'));
      })
      .then(() => console.log('Score: ' + localStorage.getItem('score') + ' saved'))
      .catch(error => console.error(error));

    // setTimeout(() => this.scene.start('PLAY'), 500);

    let logo = this.add
      .image(this.game.scale.gameSize.width / 2, 100, 'logo')
      .setScale((this.game.scale.gameSize.width / 640) * 0.5)
      .setOrigin(0.5, 0);

    this.add
      .image(10, 10, 'profile')
      .setOrigin(0)
      .setDisplaySize(50, 50);
    this.add.text(80, 25, FBInstant.player.getName(), { fontSize: 25 });

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
      this.cameras.main.fadeOut(500, 0, 0, 0);
      setTimeout(() => {
        this.scene.setVisible(false);
        this.scene.start('PLAY');
      }, 500);

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
