import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import ArchivedChannel from '../containers/ArchivedChannel'
import ChannelItem from './ChannelItem'

class ChannelList extends PureComponent {
  render() {
    const {channels, isSoloMode} = this.props
    return (
      <div className="channel-list">
        {channels.map(({id, mute, solo, archived}) => (
          archived ?
            <ArchivedChannel key={id} id={id} /> :
            <ChannelItem key={id} id={id}
              enabled={(isSoloMode && solo) || (!isSoloMode && !mute)} />
        ))}
      </div>
    )
  }
}

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

export default ChannelList
