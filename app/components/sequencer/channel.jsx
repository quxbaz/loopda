import React from 'react';
import modelUpdate from 'components/mixins/modelupdate';
import BlipComponent from './blip';

export default React.createClass({

  mixins: [modelUpdate],

  remove() {
    this.props.onRemove(this.props.model);
  },

  render() {
    let model = this.props.model;
    let blipNodes = model.state.blips.map((blip, i) => {
      let props = {
        model: blip,
        key: blip.state.id,
        isPlaying: this.props.currentBeat == i,
        tuner: this.props.tuner
      };
      return <BlipComponent {...props} />
    });
    return (
      <div className="channel">
        <div className="channel-title">
          {model.state.sampleName} -
          (<a onClick={this.remove}>remove</a>)
        </div>
        <div className="inner-channel">
          <div className="blips-container">
            {blipNodes}
          </div>
        </div>
      </div>
    );
  }

});
