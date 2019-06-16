import Phaser from 'phaser';
import { Menu } from './Scenes/menu';
import { Game } from './Scenes/Game';
import { toGame } from './Scenes/goToGame';
import { HUD } from './Scenes/HUD';
import { FBpreload } from './Scenes/FBpreload';

console.log('Orun');
// console.log(FBInstant);
// FBInstant.initializeAsync().then(function() {
//   // We can start to load assets
//   for (let i in assets) {
//     // When preloading assets, make sure to report the progress
//     FBInstant.setLoadingProgress((i / assets.length) * 100);
//   }

// });
FBInstant.initializeAsync().then(() => {
  console.log('game is starting');
  var game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: window.innerHeight * 0.8 < window.innerWidth ? window.innerHeight * 0.8 : window.innerWidth,
    height: window.innerHeight, //- 4,
    backgroundColor: 0x835530,
    pixelArt: true,
    scene: [FBpreload, Menu, Game, toGame, HUD], // add all used scenes
    // physics: {
    //   default: 'arcade',
    //   arcade: {
    //     gravity: { y: 800, x: 0 },
    //     debug: true,
    //   },
    // },

    physics: {
      default: 'matter',
      matter: {
        // debug: true,
      },
    },
  });
});
// window.addEventListener(
//   'resize',
//   function(event) {
//     game.scale.resize(
//       window.innerHeight * 0.8 < window.innerWidth ? window.innerHeight * 0.8 : window.innerWidth,
//       window.innerHeight - 4,
//     );
//   },
//   false,
// );
// });
// const assets = [];

// window.onload = function() {
//   // $('#info-section').hide();

//   // When the window loads, start to initialize the SDK
//   FBInstant.initializeAsync().then(function() {
//     // We can start to load assets
//     for (let i in assets) {
//       // When preloading assets, make sure to report the progress
//       FBInstant.setLoadingProgress((i / assets.length) * 100);
//     }

//     // Now that assets are loaded, call startGameAsync
//     FBInstant.startGameAsync().then(onStart);
//   });
// };

// function onStart() {
//   // This is called when the user has tapped Play
//   // Information from the SDK can now be accessed
//   $('#photo').attr('src', FBInstant.player.getPhoto());
//   $('#player-name').html(FBInstant.player.getName());
//   $('#player-id').html(FBInstant.player.getID());
//   $('#context-type').html(FBInstant.context.getType());
//   FBInstant.player.setStatsAsync(10);
//   console.log(FBInstant.player);

//   try {
//     $('#entrypointdata').html(JSON.stringify(FBInstant.getEntryPointData()));
//   } catch (e) {
//     console.log(e);
//   }
//   $('#info-section').show();
// }
