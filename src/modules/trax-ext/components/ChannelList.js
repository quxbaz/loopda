import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import Channel from '../providers/Channel'

class ChannelList extends PureComponent {
  render() {
    const {ids, isSoloMode} = this.props
    return (
      <div className="channel-list">
        {ids.map((id) =>
          <Channel key={id} id={id} isSoloMode={isSoloMode} />
        )}
      </div>
    )
  }
}

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool,
}

ChannelList.defaultProps = {
  isSoloMode: false,
}

export default ChannelList
