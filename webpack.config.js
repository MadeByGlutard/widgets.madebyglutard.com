'use strict'

const webpack = require('webpack')

module.exports = {
  entry: {
    'facebook/album': './src/facebook/album/index.js',
    'facebook/status': './src/facebook/status/index.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      // query: {
      //   presets: ['es2015', 'stage-0'],
      //   plugins: ['transform-runtime']
      // },
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css?modules'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
}
