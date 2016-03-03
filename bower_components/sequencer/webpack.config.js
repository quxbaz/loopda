require('es6-promise').polyfill();
var path = require('path');
var join = path.join;

var dir = path.resolve(__dirname);

var config = {

  cache: true,
  devtool: 'eval-source-map',
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
          join(dir, 'node_modules/sentry'),
          join(dir, 'node_modules/stateful'),
          join(dir, 'test'),
          join(dir, 'index.js'),
          join(dir, 'lib')
        ],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    root: dir,
    extensions: ['', '.js']
  }

};

if (process.env.mode === 'build') {
  config.entry = resolve(__dirname, 'index.js');
  // config.devtool = 'inline-source-map';
  config.devtool = undefined;
  config.output.path = './build/';
  config.output.filename = 'sequencer.js';
}

module.exports = config;
