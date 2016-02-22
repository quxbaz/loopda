import React from 'react';
import ChannelComponent from 'components/sequencer/channel';

export default React.createClass({

  propTypes: {
    sequencer: React.PropTypes.object,
    channel: React.PropTypes.object.isRequired
  },

  render() {
    let {channel} = this.props;
    let {currentBeat} = this.props.sequencer.state;
    return <ChannelComponent channel={channel} currentBeat={currentBeat} />;
  }

});
