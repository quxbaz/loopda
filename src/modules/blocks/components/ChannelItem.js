import React, {PropTypes} from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import ArchivedChannel from '../containers/ArchivedChannel'
import NormalChannel from './NormalChannel'

class ChannelItem extends PureComponent {
  render() {
    const {channel, isSoloMode} = this.props
    return (
      <div className="channel-block">
        {channel.archived ?
          <ArchivedChannel channel={channel} /> :
          <NormalChannel channel={channel} isSoloMode={isSoloMode} />}
      </div>
    )
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.object.isRequired,
  isSoloMode: PropTypes.bool.isRequired,
}

export default ChannelItem
