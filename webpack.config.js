require('es6-promise').polyfill()
const DashboardPlugin = require('webpack-dashboard/plugin')

var webpack = require('webpack')
var path = require('path')
var resolve = path.resolve

var config = {

  cache: true,
  devtool: 'source-map',
  entry: 'index.js',

  output: {
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
          resolve(__dirname, 'lib'),
          resolve(__dirname, 'tests'),
          resolve(__dirname, 'node_modules/qux'),
          resolve(__dirname, 'node_modules/dom-util'),
          resolve(__dirname, 'node_modules/sentry'),
          resolve(__dirname, 'node_modules/timer2'),
          resolve(__dirname, 'node_modules/trax'),
          resolve(__dirname, 'node_modules/stateful-router')
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
    root: resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      'loopda': resolve(__dirname),
    }
  },

  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
    new DashboardPlugin(),
  ]

}

if (process.env.NODE_ENV === 'production') {

  Object.assign(config, {

    cache: undefined,
    devtool: undefined,

    output: {
      path: 'dist',
      filename: 'loopda.min.js'
    },

    plugins: [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],

  })

  config.resolve.alias['react$'] = resolve(__dirname, 'node_modules/react/dist/react.min.js')
  config.resolve.alias['react-dom$'] = resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min.js')

}

module.exports = config
