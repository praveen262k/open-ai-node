const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const moduleFederationPlugin = require('./module-federation');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: ['core-js/stable', path.resolve(__dirname, '../src/client/index')],
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:3009/static/',
  },
  plugins: [moduleFederationPlugin.client],
};

module.exports = merge(shared, webpackConfig);
