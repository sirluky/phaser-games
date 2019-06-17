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
  devtool: 'inline-source-map',
  mode: 'development',

  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       use: 'ts-loader',
  //       exclude: /node_modules/,
  //     },
  //   ],
  // },
  // resolve: {
  //   extensions: ['.tsx', '.ts', '.js'],
  // },

  // build: {
  //   assetsPublicPath: '/',
  //   assetsSubDirectory: 'static',
  // },
};
