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
    this.load.image('logo', 'logo.png');
    this.load.image('profile', profile);
  }

  create() {
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
      let ScoreText = this.add
        .text(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 2 + 15, cscore, {
          fontSize: 40,
        })
        .setOrigin(0.5, 0);
    } else {
    }

    // this.facebook.on('savestats', ({ score }) => {
    //   BestScoreText.setText(score);
    //   console.log('test');
    // // });
    // FBInstant.player.getDataAsync(['score']).then(function(data) {
    //   console.log('loaded', data);
    //   if (typeof data['score'] !== 'undefined') {
    //     savedData.bestScore = data['score'];
    //     BestScoreText.setText(savedData.bestScore);
    //   }
    // });
    // FBInstant.player.setDataAsync({
    //   score: 10,
    // });
    // this.facebook.saveStats({ score: 1 });

    // this.facebook.on('savestats', function(data) {
    //   this.facebook.getStats();
    //   console.log('ulozeno');
    //   //  Handle what the game should do after the stats have saved
    // });
    // this.facebook.on('getstatsfail', function(error) {
    //   //  Handle what the game should do if the stats fail to load.
    //   throw error;
    // });
    // this.facebook.on('getstats', function({ score = 0 }) {
    //   console.log('score je ' + score);
    // });

    this.sound.pauseOnBlur = true;
    this.sound.volume = 0.2;
    // setTimeout(() => this.scene.start('PLAY'), 500);

    let logo = this.add
      .image(this.game.scale.gameSize.width / 2, 100, 'logo')
      .setScale(this.game.scale.gameSize.width / 640)
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
