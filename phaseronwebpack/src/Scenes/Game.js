import Phaser from 'phaser';
import { emmiter } from '../GlobalFunc';

const cWidth = 1000;
const speedUpSpeed = 0.025;
const circlePositions = [(cWidth / 8) * 7 + cWidth / 48, (cWidth / 8) * 7 + (cWidth / 48) * 3, cWidth - cWidth / 48];
const CratesSpawnOffAngle = 90;
class Game extends Phaser.Scene {
  constructor() {
    super('GAME');
    this.lastAngleSpawn = 0;
  }
  init() {
    this.lastAngleSpawn = 0;

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
    this.gameSpeed = 0.2;

    this.Touching = false;
    // this.cameras.main.setPosition(0, 100);
    // this.cameras.main.pan(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 2);
  }

  preload() {
    this.load.spritesheet('plr', 'char.png', { frameWidth: 256, frameHeight: 128 });
    this.load.image('board', 'thecircle.png');
    this.load.image('stone', 'stone.png');
  }

  create() {
    this.matter.add.image(-200, 100, 'plr').setIgnoreGravity(true);
    // this.spawner = this.add.line(0, 0, 0, 0, 125, 0, 0x00ff00).setDepth(1);
    this.spawner = this.matter.add.image(0, 0, 'stone');
    this.spawner.setDepth(1);
    this.spawner.setDisplaySize(125, 60);
    this.spawner.setSize();

    // .setIgnoreGravity(true);
    this.spawner.name = 'obstacleDestroyer';
    this.plr = this.matter.add
      .sprite(this.plrpos + 875, this.cpos.y, 'plr')
      .setScale(cWidth / 3 / 1500 - 0.03)
      .setOrigin(0.5);
    this.plr.name = 'player';

    this.plr.setIgnoreGravity(true);
    this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      console.log(bodyA, bodyB);
      if (bodyA.gameObject.name === 'player' || bodyB.gameObject.name === 'player') console.log('collision');

      if (bodyA.gameObject.name === 'obstacle' && bodyB.gameObject.name === 'player') {
        this.scene.start('MENU');
      }
      if (bodyA.gameObject.name === 'player' && bodyB.gameObject.name === 'obstacle') this.scene.start('MENU');
      if (bodyA.gameObject.name === 'player' && bodyB.gameObject.name === 'obstacle') this.scene.start('MENU');
      if (bodyA.gameObject.name === 'Point' && bodyB.gameObject.name === 'player') {
        emmiter.emit('ScoreUp', 1);
        this.gameSpeed += speedUpSpeed;
      }
      if (bodyA.gameObject.name === 'player' && bodyB.gameObject.name === 'Point') {
        emmiter.emit('ScoreUp', 1);
        this.gameSpeed += speedUpSpeed;
      }
      if (bodyA.gameObject.name === 'obstacleDestroyer' && bodyB.gameObject.name === 'obstacle') {
        bodyB.gameObject.setVisible(false);
        bodyB.destroy();

        // bodyB.destroy();
      } else if (bodyA.gameObject.name === 'obstacle' && bodyB.gameObject.name === 'obstacleDestroyer') {
        bodyA.gameObject.setVisible(false);

        bodyA.destroy();

        // bodyA.destroy();
      }

      // obstacleDestroyer
      // Point
    });
    this.matter.world.disableGravity();

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

    for (let i = 0; i < 4; i++) {
      // this.add.rectangle()
      let PointRect = this.matter.add
        .image(0, circlePositions[1], 'stone')
        .setDisplaySize(125, 5)
        .setSize(); //.rectangle(0, circlePositions[1], 0, 125, {}); //.setDepth(1); //line(0, circlePositions[1], 0, 0, 125, 0, 0x00ff00).setDepth(1);
      const { OnCirclePos } = PositionOnCircle(this.cpos, circlePositions[1], i * 90);
      PointRect.setPosition(OnCirclePos.x, OnCirclePos.y);
      PointRect.setRotation((i * Math.PI) / 2);
      PointRect.setStatic(true);
      PointRect.name = 'Point';
    }

    this.scene.launch('HUD');

    this.createCratesInterval = setInterval(e => {
      this.SpawnCrates();
    }, 3000);

    this.events.on('shutdown', () => {
      clearInterval(this.createCratesInterval);
      this.scene.stop('PLAY');
      // this.scene.('HUD');
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
    // if (this.lastAngleSpawn + 30 <= this.plrangle) {
    //   this.SpawnCrates();
    //   this.lastAngleSpawn = this.plrangle;
    // }
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

    const { OnCirclePos: spawnerPos } = PositionOnCircle(
      this.cpos,
      circlePositions[1],
      this.plrangle + CratesSpawnOffAngle + 10,
    );

    this.spawner.setOrigin(0.5);
    this.spawner.setPosition(spawnerPos.x, spawnerPos.y);
    this.spawner.setAngle(this.plrangle + CratesSpawnOffAngle + 10 + 5);
    this.plrangle += this.gameSpeed;
  }
  SpawnCrates() {
    let multiple = Phaser.Math.RND.between(1, 2);
    let cratesPositions = [];

    switch (multiple) {
      case 1:
        let cpositions = circlePositions.slice();
        var rnd = Phaser.Math.RND.between(0, 2);
        var pos = circlePositions[rnd];
        cpositions.splice(rnd);
        cratesPositions.push(pos);
        cratesPositions.push(cpositions[Phaser.Math.RND.between(0, cpositions.length - 1)]);
        break;
      case 2:
        cratesPositions.push(circlePositions[Phaser.Math.RND.between(0, 2)]);
        break;
    }
    cratesPositions.forEach(thePos => {
      const { OnCirclePos: poc } = PositionOnCircle(this.cpos, thePos, this.plrangle + CratesSpawnOffAngle);
      let obst = this.matter.add
        .image(poc.x, poc.y, 'stone')
        .setIgnoreGravity(true)
        .setScale(0.4)
        .setStatic(true);
      obst.name = 'obstacle';
    });
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
// function SpawnCrates() {}