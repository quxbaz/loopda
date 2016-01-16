// require('bower_components/normalize-css/normalize.css');
// require('./styles/app.less');

require('bower_components/mocha/mocha.css');
require('bower_components/mocha/mocha');
require('bower_components/chai/chai').should();

import App from 'app';

mocha.setup('bdd');

// let app = new App();
// app.init().then(() => {
//   console.log('-- STARTING TESTS --');
//   // app.start();
//   mocha.run();
// });
