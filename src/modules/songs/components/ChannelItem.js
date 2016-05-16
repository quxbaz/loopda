import React from 'react'
import ChannelList from '../containers/ChannelList'
import traxExt from '../../trax-ext'

class ChannelItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {channel} = this.props
    return (
      <div>
        <traxExt.components.Channel channel={channel} />
      </div>
    )
  }

}

ChannelItem.propTypes = {
  channel: React.PropTypes.object.isRequired,
  // onClick: React.PropTypes.func.isRequired,
}

export default ChannelItem
