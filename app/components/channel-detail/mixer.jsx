import React from 'react';
import {capitalize, throttle} from 'lib/util';
import BlipCtrl from 'controllers/sequencer/blip';
import Slider from 'components/ui/slider';

let playBlip = throttle((blip) => BlipCtrl.playBlip(blip), 70);

export default React.createClass({

  propTypes: {
    blip: React.PropTypes.object.isRequired
  },

  setBlipState(prop, value) {
    BlipCtrl.setBlipState(this.props.blip, {
      [prop]: value
    });
    playBlip(this.props.blip);
  },

  render() {

    let {state} = this.props.blip;
    let partial = (prop) => (value) => this.setBlipState(prop, value);

    // <TEMP> Get this from some other source.
    let mixerProps = ['offset', 'gain', 'rate'];

    let sliders = mixerProps.map((prop, i) => {
      return React.createElement(Slider, {
        key: i,
        value: state[prop],                    // -> state['gain']
        min: state['min' + capitalize(prop)],  // -> state['minGain']
        max: state['max' + capitalize(prop)],  // -> state['maxGain']
        onChange: partial(prop)
      });
    });

    return (
      <div className="mixer">
        {sliders}
      </div>
    );

  }

});
