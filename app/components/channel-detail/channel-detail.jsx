import React from 'react';
import ChannelComponent from 'components/sequencer/channel';

export default React.createClass({

  render() {
    let {model} = this.props;
    return <ChannelComponent channel={model} />;
  }

});
