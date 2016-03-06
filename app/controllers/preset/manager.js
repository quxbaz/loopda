import store from 'globals/store';
import watcher from 'globals/watcher';
import mixables from 'globals/mixables';

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
  },

  mix(preset, prop, value) {
    if (!mixables.includes(prop))
      throw new Error('Prop @' + prop + ' is not a mixable.');
    preset.setState({[prop]: value});
    preset.save();
  }

};
