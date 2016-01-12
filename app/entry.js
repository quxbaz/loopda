require('bower_components/normalize-css/normalize.css');
require('./styles/app.less');

import App from 'app';

let app = new App();
app.init().then(() => {
  console.log('-- STARTING APP --');
  app.start();
});
