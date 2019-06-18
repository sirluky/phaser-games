import 'phaser';
import { emmiter } from '../GlobalFunc';

class SideClick extends Phaser.Scene {
  constructor() {
    super('CONTROL_SideClick');
  }

  create() {
    this.centerEmitted = false;

    // let pointerDown = this.input.on('pointerdown', event => {
    //   if (event.downX < this.game.scale.gameSize.width * 0.5) {
    //     // this.lastSmer.push(-1);
    //     emmiter.emit('🏃‍♂️', -1);
    //   } else {
    //     // this.lastSmer.push(1);
    //     emmiter.emit('🏃‍♂️', 1);
    //   }
    // });
    // this.events.on('shutdown', () => {
    //   this.input.off('pointerdown');
    // });
    // this.input.on('pointerup', event => {
    //   emmiter.emit('🏃‍♂️', 0);

    //   // if (event.offsetX < this.game.scale.gameSize.width * 0.5) {
    //   // } else {
    //   //   emmiter.emit('🏃‍♂️', 1);
    //   // }
    // });
  }
  update() {
    if (!this.input.activePointer.isDown) {
      if (!this.centerEmitted) {
        emmiter.emit('🏃‍♂️', 0);
        this.centerEmitted = true;
      }
    } else {
      // if (this.centerEmitted === true) {
      // console.log(this.input.activePointer);
      if (this.input.activePointer.x > this.game.scale.gameSize.width * 0.5) {
        // this.lastSmer.push(-1);
        emmiter.emit('🏃‍♂️', -1);
      } else {
        // this.lastSmer.push(1);
        emmiter.emit('🏃‍♂️', 1);
      }
      this.centerEmitted = false;
    }
    // }
  }
}

class SwipeTouch extends Phaser.Scene {
  constructor() {
    super('CONTROL_SWIPETOUCH');
  }
  init() {
    this.lastTouchPos = { x: 0, y: 0 };
    this.Touching = false;
    this.plrposRaw = { x: 0, y: 0 };

    this.input.on('pointerdown', e => {
      const pointer = this.input.activePointer;
      const touchX = pointer.x;
      const touchY = pointer.y;
      this.Touching = true;
      this.lastTouchPos = { x: touchX, y: touchY };
    });
    this.input.on('pointerup', e => {
      this.Touching = false;
    });
  }
  create() {
    const pointer = this.input.activePointer;
    const touchX = pointer.x;
    const touchY = pointer.y;

    const TouchDistMin = 70;
    if (pointer.isDown) {
      if (this.Touching) {
        if (touchX - this.lastTouchPos.x > TouchDistMin) {
          MoveOnLine.bind(this)(1);
          console.log('posun vlevo');
          this.lastTouchPos = { x: touchX, y: touchY };
        }
        if (this.lastTouchPos.x - touchX > TouchDistMin) {
          MoveOnLine.bind(this)(-1);
          console.log('posun vpravo');
          this.lastTouchPos = { x: touchX, y: touchY };
        }
      }
    }
  }
}

export { SideClick, SwipeTouch };
