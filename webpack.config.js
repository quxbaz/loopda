require('es6-promise').polyfill()
var path = require('path')
var resolve = path.resolve

var config = {

  cache: true,
  devtool: 'source-map',
  entry: 'index.js',

  output: {
    path: 'build',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: [
          resolve(__dirname, 'index'),
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules/trax'),
          // resolve(__dirname, 'node_modules/bin.js'),
          // resolve(__dirname, 'node_modules/pending'),
          // resolve(__dirname, 'node_modules/sentry'),
          // resolve(__dirname, 'node_modules/sequencer'),
          // resolve(__dirname, 'node_modules/stateful'),
          // resolve(__dirname, 'node_modules/store')
        ],
        query: {
          presets: ['es2015', 'react'],
          plugins: ["transform-object-rest-spread"]
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
    // root: [resolve(__dirname), resolve('app')],
    root: resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      'loopda': resolve(__dirname, 'src'),
      'react-dom': resolve('node_modules/react/lib/ReactDOM.js')
    }
  }

}

module.exports = config
