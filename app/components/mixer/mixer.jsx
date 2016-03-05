import React from 'react';
import mixables from 'globals/mixables';
import {keys, intersect, capitalize} from 'lib/util';
import Slider from 'components/ui/slider';

export default React.createClass({

  propTypes: {
    mixable: React.PropTypes.object.isRequired,
    onMix: React.PropTypes.func.isRequired
  },

  render() {

    let {mixable, onMix} = this.props;
    let {state} = mixable;
    let localMixables = intersect(keys(state), mixables);

    let sliders = localMixables.map((prop) => {
      return React.createElement(Slider, {
        key: prop,
        value: state[prop],                    // 'gain'
        min: state['min' + capitalize(prop)],  // 'minGain'
        max: state['max' + capitalize(prop)],  // 'maxGain'
        onChange: (newValue) => onMix(mixable, prop, newValue)
      });
    });

    return (
      <div className="mixer">
        {sliders}
      </div>
    );

  }

});
