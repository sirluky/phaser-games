import 'phaser';

class toGame extends Phaser.Scene {
  constructor() {
    super('PLAY');
  }
  init() {
    console.log('lerping');
    this.cpos = {
      x: this.game.scale.gameSize.width / 2,
      y: this.game.scale.gameSize.width / 2 + 50,
    };

    this.plrangle = 0;
    this.cWidth = 1000;
    this.plrpos = 0;
    this.plrRange = this.cWidth / 2 + this.cWidth / 4; // default position

    this.positions = [
      this.cWidth / 2 + this.cWidth / 12,
      this.cWidth / 2 + this.cWidth / 4,
      this.cWidth / 2 + this.cWidth / 4 + this.cWidth / 6,
    ];

    this.lastTouchPos = { x: 0, y: 0 };
    this.plrposRaw = { x: 0, y: 0 };

    this.Touching = false;
    // this.cameras.main.setPosition(0, 100);
    // this.cameras.main.pan(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 2);
  }

  preload() {
    this.load.spritesheet('plr', 'char.png', { frameWidth: 256, frameHeight: 128 });
    this.load.image('pause', 'pause.png');
    this.load.image('board', 'gboard.png');
  }

  create() {
    this.anims.create({
      key: 'plr',
      frames: this.anims.generateFrameNumbers('plr', {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    this.add.text(this.game.scale.gameSize.width, 0, 'pause').setOrigin(1, 0);

    this.add
      .image(this.game.scale.gameSize.width, 15, 'pause')
      .setOrigin(1, 0)
      .setScale(0.09)
      .setTintFill(0xffffff);
    this.add.text(0, 0, 'score').setOrigin(0, 0);
    this.add.text(22, 40, '0', { fontSize: 50 }).setOrigin(0.5);
    this.add.circle(this.cpos.x, this.cpos.y, this.cWidth, 0x613315).setDepth(-5);
    this.add
      .image(this.cpos.x, this.cpos.y, 'board')
      .setScale(this.cWidth / 800)
      .setDepth(-4);

    this.plr = this.add
      .sprite(this.cpos.x, this.cpos.y, 'plr')
      .setScale(this.cWidth / 3 / 500 - 0.03)
      .setOrigin(0.5);
    // this.add.circle()
    this.cameras.main.fadeIn(1000, 131, 85, 48);
    this.plr.anims.play('plr');
    // console.log(crcpos);
    this.cameras.main.startFollow(this.plr, true, 0.2, 0.2);
    this.cameras.main.setZoom(0.7);

    setInterval(() => {
      this.plrRange = this.positions[Phaser.Math.RND.between(0, 2)]; //
    }, 1000);
  }
  update() {
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      var touchX = pointer.x;
      var touchY = pointer.y;
      if (this.Touching === true) {
        this.plrRange += (touchX - this.lastTouchPos.x) * 1.2;
      }
      this.Touching = true;
      this.lastTouchPos = { x: touchX, y: touchY };
    } else {
      this.Touching = false;
    }
    // const crcpos = {
    //   x: Math.sin(this.plrangle) * this.cWidth,
    //   y: Math.cos(this.plrangle) * this.cWidth,
    // };
    var vector = new Phaser.Math.Vector2({ x: 1, y: 1 });
    vector.setToPolar((this.plrangle / 360) * Math.PI * 2, this.plrRange);
    this.cameras.main.setFollowOffset(
      (((vector.y * 0.6) / 4) * (0.5 + this.plrRange) * 1.5) / 1000,
      ((-vector.x / 5) * this.plrRange) / 1000,
    );
    this.plrpos = { x: vector.x + this.cpos.x, y: vector.y + this.cpos.y };
    this.plr.setPosition(this.plrpos.x, this.plrpos.y);
    this.plr.setAngle(this.plrangle);
    this.plrangle += 0.5;
  }
}
export { toGame };
