// require('bower_components/normalize-css/normalize.css');
// require('./styles/app.less');

import 'bower_components/mocha/mocha.css';
import 'bower_components/mocha/mocha';  // Creates a global @mocha variable.
require('bower_components/chai/chai').should();

// import App from 'app';

mocha.setup('bdd');

// Tests
import './tests/lib/util';

// let app = new App();
// app.init().then(() => {
//   console.log('-- STARTING TESTS --');
//   // app.start();
  mocha.run();
// });
