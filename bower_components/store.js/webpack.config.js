require('es6-promise').polyfill();
var path = require('path');
var resolve = path.resolve;

var config = {

  cache: true,
  devtool: 'source-map',
  entry: 'test/test.js',

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          resolve(__dirname, 'index.js'),
          resolve(__dirname, 'lib/'),
          resolve(__dirname, 'test/'),
          resolve(__dirname, 'node_modules/bin.js/'),
          resolve(__dirname, 'node_modules/sentry/')
        ],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    root: resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      'store': resolve(__dirname)
    }
  }

};

module.exports = config;
