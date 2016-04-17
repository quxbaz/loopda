/*
  Blip View-Model
*/

import {titleCase} from 'lib/util';

export default {

  getValueMinMax(model, prop) {
    return {
      value: model.state[prop],
      min: model.state['min' + titleCase(prop)],
      max: model.state['max' + titleCase(prop)]
    };
  },

  toPercent(model, prop) {
    /*
      Returns the value of a property as a proportion of its min and
      max values.
    */
    let {value, min, max} = this.getValueMinMax(model, prop);
    return Math.round((value - min) / (max - min) * 100);
  },

  toValue(model, prop, percent) {
    /*
      Returns a property value as it's actual value, not as a
      proportion of it's min/max.
    */
    if (percent < 0 || percent > 100)
      throw new Error('@percent must be a number between 0 and 100.');
    let {min, max} = this.getValueMinMax(model, prop);
    return (max - min) * (percent / 100) + min;
  }

};
