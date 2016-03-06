require('es6-promise').polyfill();
var path = require('path');
var resolve = path.resolve;

var config = {

  cache: true,
  devtool: 'source-map',
  entry: './app/entry.js',

  output: {
    path: 'build',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          resolve(__dirname, 'app'),
          resolve(__dirname, 'node_modules/bin.js'),
          resolve(__dirname, 'node_modules/pending'),
          resolve(__dirname, 'node_modules/sentry'),
          resolve(__dirname, 'node_modules/sequencer'),
          resolve(__dirname, 'node_modules/stateful')
          resolve(__dirname, 'node_modules/store'),
        ],
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      }
    ]
  },

  resolve: {
    root: [resolve(__dirname), resolve('app')],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-dom'  : resolve('node_modules/react/lib/ReactDOM.js')
    }
  }

};

if (process.env.mode == 'test') {
  config.entry = './app/test.js';
}

module.exports = config;
