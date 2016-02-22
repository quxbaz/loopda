import React from 'react';
import ChannelComponent from 'components/sequencer/channel';

export default React.createClass({

  propTypes: {
    channel: React.PropTypes.object.isRequired
  },

  render() {
    let {channel} = this.props;
    return <ChannelComponent channel={channel} />;
  }

});
