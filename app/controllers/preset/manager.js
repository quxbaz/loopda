import store from 'globals/store';
import watcher from 'globals/watcher';

export default {

  addPreset(manager, title, sample) {
    let preset = store.createRecord('preset', {
      title,
      sample
    });
    manager.setState({
      presets: [...manager.state.presets, preset]
    });
    preset.save();
    watcher.include(preset);
  }

};
