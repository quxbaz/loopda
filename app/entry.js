// Styles
import 'normalize-css/normalize.css';
import './styles/app.less';

// Modules
import 'regenerator/runtime';
import App from 'app';

let app = new App();
app.init().then(() => {
  console.log('-- STARTING APP --');
  app.start();
});
