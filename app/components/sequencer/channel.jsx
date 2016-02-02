import React from 'react';
import classNames from 'classnames';
import modelUpdate from 'components/mixins/modelupdate';
import BlipComponent from './blip';

export default React.createClass({

  mixins: [modelUpdate],

  remove() {
    this.props.onRemove(this.props.model);
  },

  toggleMute() {
    let model = this.props.model;
    model.setState({mute: !model.state.mute});
  },

  render() {

    return <div>Channel</div>

    let model = this.model();

    let channelClassNames = classNames({
      channel: true,
      mute: model.state.mute
    });

    let blipNodes = model.state.blips.map((blip, i) => {
      let props = {
        model: blip,
        key: blip.id,
        isPlaying: !model.state.mute && this.props.currentBeat == i,
        tuner: this.props.tuner
      };
      return <BlipComponent {...props} />
    });

    // let blipNodes = [];

    return (
      <div className={channelClassNames}>
        <div className="channel-title">
          {model.state.sampleName} -
          (<a onClick={this.remove}>remove</a>) -
          (<a onClick={this.toggleMute}>
            {model.state.mute ? 'unmute' : 'mute'}
          </a>)
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
