// Styles
import 'bower_components/normalize-css/normalize.css';
import './styles/app.less';

// Modules
import App from 'app';

let app = new App();
app.init().then(() => {
  console.log('-- STARTING APP --');
  app.start();
});
