import {router} from 'globals/router';
import store from 'globals/store';
import {watch} from 'globals/watcher';
import mixables from 'globals/mixables';

export default {

  viewPreset(preset) {
    router.nav('/preset/' + preset.state.id);
  },

  addPreset(manager, title, sample) {
    let preset = store.create('preset', {title, sample});
    preset.save();
    manager.setState({
      presets: [...manager.state.presets, preset]
    });
  },

  mix(mixable, prop, value) {
    if (!mixables.includes(prop))
      throw new Error('Prop @' + prop + ' is not a mixable.');
    mixable.setState({[prop]: value});
  }

};
