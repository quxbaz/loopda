import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelItem from '../providers/ChannelItem'

class ChannelList extends PureComponent {
  render() {
    const {ids, isSoloMode} = this.props
    return (
      <div className="channel-list">
        {ids.map((id) => (
          <ChannelItem key={id} id={id} isSoloMode={isSoloMode} />
        ))}
      </div>
    )
  }
}

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

export default ChannelList
