import React from 'react';
import Stateful from 'stateful';
import {route} from 'globals/router';
import store from 'globals/store';
import {watch} from 'globals/watcher';
import PresetManager from 'components/preset/manager';

route('/preset', {
  resource() {
    return Promise.all([
      store.Manager.one(),
      store.Preset.all()
    ]);
  },
  setup([manager, presets]) {
    manager.setState({presets});
    return manager;
  },
  render(manager) {
    return <PresetManager manager={manager} />;
  }
});
