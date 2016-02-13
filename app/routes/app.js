import React from 'react';
import ReactDOM from 'react-dom';
import {setRoute} from 'app/router';
import store from 'app/store';
import AppComponent from 'components/app';

setRoute('/', {
  on: () => {
    ReactDOM.render(<AppComponent model={app} />, $app);
  }
});
