import Phaser from 'phaser';
import { Menu } from './Scenes/menu';
import { Game } from './Scenes/Game';
import { toGame } from './Scenes/goToGame';

window.onload = function() {
  var game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: window.innerHeight * 0.8 < window.innerWidth ? window.innerHeight * 0.8 : window.innerWidth,
    height: window.innerHeight - 4,
    backgroundColor: 0x835530,
    scene: [Menu, Game, toGame], // add all used scenes
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 800, x: 0 },
        debug: true,
        physics: {
          default: 'matter',
          matter: {},
        },
      },
    },
  });
  window.addEventListener(
    'resize',
    function(event) {
      game.scale.resize(
        window.innerHeight * 0.8 < window.innerWidth ? window.innerHeight * 0.8 : window.innerWidth,
        window.innerHeight - 4,
      );
    },
    false,
  );
};
