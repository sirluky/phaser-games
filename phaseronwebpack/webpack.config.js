const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    FBInstant: 'FBInstant',
  },
  // build: {
  //   assetsPublicPath: '/',
  //   assetsSubDirectory: 'static',
  // },
};
