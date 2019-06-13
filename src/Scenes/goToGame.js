import Phaser from 'phaser';
import { emmiter } from '../StartGame';

class toGame extends Phaser.Scene {
  constructor() {
    super('PLAY');
  }
  init() {
    this.Touching = false;
    this.lastTouchPos = { x: 0, y: 0 };
  }

  preload() {}

  create() {
    console.log('gotogame');
    this.add
      .text(this.game.scale.gameSize.width / 2, (this.game.scale.gameSize.height / 3) * 2, 'Swipe to change line')
      .setOrigin(0.5);
    this.cameras.main.fadeIn(1000, 131, 85, 48);
    this.scene.launch('GAME');
    this.input.on('pointerdown', e => {
      this.scene.sleep();
      this.scene.setVisible(false);
      emmiter.emit('START', 1);
    });

    setTimeout(e => {
      // emmiter.emit('S', 1);
    }, 200);
  }
}
export { toGame };
