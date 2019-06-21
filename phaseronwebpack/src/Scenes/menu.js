import 'phaser';

class Menu extends Phaser.Scene {
  constructor() {
    super('MENU');
  }
  init() {}

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
    this.BestScoreText = this.add.text(this.game.scale.gameSize.width / 2, 5, '', { fontSize: 40 });
    this.TriesText = this.add.text(this.game.scale.gameSize.width - 100, 5, '', { fontSize: 40 }).setOrigin(1, 0);

    this.facebook.once('getstats', data => {
      if (data.score >= 0 && data.tries >= 0) {
        console.log('score je nacteno', data);
      } else {
        data.score = 0;
        data.tries = 0;
      }
      this.BestScoreText.setText('' + data.score);
      this.TriesText.setText('' + data.tries);
    });
    this.facebook.getStats();

    this.facebook.on('savestats', function(data) {
      //  Handle what the game should do after the stats have saved
      this.BestScoreText.setText('' + data.score);
      this.TriesText.setText('' + data.tries);
    });

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

    // this.facebook.on('savestats', function(data) {
    //   console.log('ulozeno');
    //   //  Handle what the game should do after the stats have saved
    // });
    // this.facebook.on('getstatsfail', function(error) {
    //   //  Handle what the game should do if the stats fail to load.
    //   throw error;
    // });

    // this.facebook.on('savestatsfail', function(error) {
    //   console.log('savestats error', error);

    //   //  Handle what the game should do if the stats fail to save
    // });

    // var defaultHuman = {
    //   level: 2,
    // };

    // this.facebook.saveStats(defaultHuman);
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

    this.playEvent = play.on('pointerdown', e => {
      // this.cameras.main.shake(300, 0.01);
      this.cameras.main.pan(
        this.game.scale.gameSize.width / 2,
        this.game.scale.gameSize.height,
        1000,
        'Sine',
        false,
        e => {
          this.scene.moveDown();
          this.scene.switch('PLAY');
        },
      );
      // this.cameras.main.setAlpha(0.1);
      // this.cameras.main.fadeOut(500, 131, 85, 48);

      // this.cameras.main.scrollY = 200;
      // this.cameras.main.setPosition(0, this.game.scale.gameSize.height);
    });
    this.events.on('sleep', e => {
      console.log('menu sleep');
      this.play.setInteractive(false);

      this.cameras.main.setPosition(0, 0);
    });
    this.events.on('wake', e => {
      console.log('menu back');
      this.cameras.main.setPosition(0, 0);
      //  this.playEvent = play.on('pointerdown', e => {
      // // this.cameras.main.shake(300, 0.01);
      // this.cameras.main.pan(
      //   this.game.scale.gameSize.width / 2,
      //   this.game.scale.gameSize.height,
      //   1000,
      //   'Sine',
      //   false,
      //   e => {
      //     this.scene.moveDown();
      //     this.scene.switch('PLAY');
      //   },
      // );
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
