import Phaser from 'phaser';
import { emmiter } from '../StartGame';

const cWidth = 1000;

const circlePositions = [(cWidth / 8) * 7 + cWidth / 48, (cWidth / 8) * 7 + (cWidth / 48) * 3, cWidth - cWidth / 48];
class Game extends Phaser.Scene {
  constructor() {
    super('GAME');
  }
  init() {
    setTimeout(e => {
      this.scene.start('MENU');
    }, 30000);
    this.createCratesInterval = setTimeout(() => {
      this.createCrates();
    }, 500);

    console.log('lerping');
    this.cpos = {
      x: this.game.scale.gameSize.width / 2,
      y: this.game.scale.gameSize.width / 2 + 50,
    };
    this.cLine = 1;
    this.plrangle = 0;
    this.plrpos = 0;

    this.plrRange = circlePositions[1]; // default position

    this.lastTouchPos = { x: 0, y: 0 };
    this.plrposRaw = { x: 0, y: 0 };

    this.Touching = false;
    // this.cameras.main.setPosition(0, 100);
    // this.cameras.main.pan(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 2);
  }

  preload() {
    this.load.spritesheet('plr', 'char.png', { frameWidth: 256, frameHeight: 128 });
    this.load.image('pause', 'pause.png');
    this.load.image('board', 'thecircle.png');
  }

  create() {
    this.matter.add.image(-200, 100, 'plr').setIgnoreGravity(true);
    this.spawner = this.add.line(0, 0, 0, 0, 125, 0, 0x00ff00).setDepth(1);
    this.plr = this.matter.add
      .sprite(this.plrpos + 875, this.cpos.y, 'plr')
      .setScale(cWidth / 3 / 1500 - 0.03)
      .setOrigin(0.5);
    this.plr.name = 'player';

    this.plr.setIgnoreGravity(true);
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      console.log(bodyA, bodyB);
      if (bodyA.gameObject.name === 'player' || bodyB.gameObject.name === 'player') console.log('collision');
    });
    // this.matter.add.image(50, 50, 'plr');
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

    this.add
      .text(this.game.scale.gameSize.width, 0, 'pause')
      .setOrigin(1, 0)
      .setScrollFactor(0);

    this.add
      .image(this.game.scale.gameSize.width, 15, 'pause')
      .setOrigin(1, 0)
      .setScale(0.09)
      .setTintFill(0xffffff)
      .setScrollFactor(0);
    this.add
      .text(0, 0, 'score')
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.add
      .text(22, 40, '0', { fontSize: 50 })
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.add.circle(this.cpos.x, this.cpos.y, cWidth, 0x613315).setDepth(-5);
    this.add
      .image(this.cpos.x, this.cpos.y, 'board')
      .setScale(cWidth / 800)
      .setDepth(-4);

    // this.add.circle()
    this.plr.anims.play('plr');
    // console.log(crcpos);
    this.cameras.main.startFollow(this.plr, true, 0.2, 0.2);
    this.cameras.main.setZoom(0.7);

    // setInterval(() => {
    //   this.plrRange = circlePositions[Phaser.Math.RND.between(0, 2)]; //
    // }, 1000);
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

    emmiter.on('START', () => {
      //  console.log('pllls');
    });
  }
  update() {
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
    // const crcpos = {
    //   x: Math.sin(this.plrangle) *cWidth,
    //   y: Math.cos(this.plrangle) *cWidth,
    // };
    const { noOffPos: vector, OnCirclePos: plrpos } = PositionOnCircle(this.cpos, this.plrRange, this.plrangle);
    this.plrpos = plrpos;

    this.cameras.main.setFollowOffset(
      (((vector.y * 0.6) / 4) * (0.5 + this.plrRange) * 1.5) / 1000,
      ((-vector.x / 5) * this.plrRange) / 1000,
    );

    this.plr.setPosition(this.plrpos.x, this.plrpos.y);
    this.plr.setAngle(this.plrangle);

    const { OnCirclePos: spawnerPos } = PositionOnCircle(this.cpos, circlePositions[1], this.plrangle - 5);

    this.spawner.setOrigin(0.5);
    this.spawner.setPosition(spawnerPos.x, spawnerPos.y);
    this.spawner.setAngle(this.plrangle - 5);
    this.plrangle += 0.5;
  }
  createCrates() {
    let multiple = Phaser.Math.RND.between(1, 2);
    let cratesPositions = [];

    switch (multiple) {
      case 1:
        cratesPositions.push(circlePositions[Phaser.Math.RND.between(0, 2)]);
        cratesPositions.push(circlePositions[Phaser.Math.RND.between(0, 2)]);
        break;
      case 2:
        cratesPositions.push(circlePositions[Phaser.Math.RND.between(0, 2)]);
        break;
    }
    return cratesPositions;
  }
}
export { Game };

function MoveOnLine(smer) {
  let cline = this.cLine;
  cline += smer;

  if (cline < circlePositions.length && cline >= 0) {
    this.cLine = cline;
  }
  const Range = circlePositions[this.cLine];
  // console.log(this.add.tween);
  this.add.tween({
    targets: this,
    plrRange: Range,
    duration: 100,
    delay: 0,
    ease: t => t,
  });
  // this.add.tween(this).to({ plrRange: Range }, 1000, Phaser.Easing.Linear.None, true, 500);
  // pointsTween.onUpdateCallback(function() {
  //   console.log(this.plrRange);
  // }, this);
  // this.plrRange = circlePositions[this.cLine];
}
function PositionOnCircle(Centerpos = null, range, angle) {
  var vector = new Phaser.Math.Vector2({ x: 1, y: 1 });
  vector.setToPolar((angle / 360) * Math.PI * 2, range);
  if (Centerpos === null) {
    Centerpos = { x: 0, y: 0 };
  }
  const OnCirclePos = { x: vector.x + Centerpos.x, y: vector.y + Centerpos.y };
  return { noOffPos: vector, OnCirclePos };
}
function SpawnCrates() {}
