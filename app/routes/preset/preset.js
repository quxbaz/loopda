import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import PresetManager from 'components/preset/manager';

route('/preset/:id', {
  resource(id) {
    return Promise.all([
      store.Manager.one(),
      store.Preset.get(id)
    ]);
  },
  render([manager, preset]) {
    return (
      <PresetManager manager={manager} preset={preset} />
    );
  }
});
