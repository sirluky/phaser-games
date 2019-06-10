import 'phaser';

class Menu extends Phaser.Scene {
  constructor() {
    super('MENU');
  }
  init() {
    this.sound.pauseOnBlur = true;
    this.sound.volume = 0.2;
    this.rekord = (localStorage.getItem('rekord') && parseInt(localStorage.getItem('rekord'))) || '';
  }

  preload() {
    this.load.image('play', 'play.png');
  }

  create() {
    this.add.text(320, 250, this.rekord, { fontSize: 100 }).setOrigin(0.5);
    let play = this.add
      .image(310, 100, 'play')
      .setScale(1.5)
      .setOrigin(0.5);

    play.setInteractive();
    play.on('pointerdown', e => {
      this.scene.start('Flappy');
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
