import React from 'react'
import ChannelList from '../containers/ChannelList'
import traxExt from '../../trax-ext'

class ChannelItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {channel, enabled} = this.props
    return (
      <div className="channel-item">
        <traxExt.components.Channel channel={channel} enabled={enabled} />
      </div>
    )
  }

}

ChannelItem.propTypes = {
  channel: React.PropTypes.object.isRequired,
  enabled: React.PropTypes.bool.isRequired,
}

export default ChannelItem
