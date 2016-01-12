require('es6-promise').polyfill();
var path = require('path');
var resolve = path.resolve;

module.exports = {

  cache: true,
  devtool: 'eval-source-map',
  entry: './app/entry.js',

  output: {
    path: 'build',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          resolve(__dirname, 'app'),
          resolve(__dirname, 'bower_components/sequencer')
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

      // npm
      'react'      : resolve('node_modules/react/react.js'),
      'react-dom'  : resolve('node_modules/react/lib/ReactDOM.js'),

      // bower
      'classnames' : resolve('bower_components/classnames/index.js'),
      'http'       : resolve('bower_components/http.js/http.js'),
      'sequencer'  : resolve('bower_components/sequencer/index.js')

      // app
      // --

    }
  }

};
