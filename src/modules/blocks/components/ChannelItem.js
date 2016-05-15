import React from 'react'
import traxExt from '../../trax-ext'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelControls from '../containers/ChannelControls'

class ChannelItem extends PureComponent {
  render() {
    const {id, enabled} = this.props
    return (
      <div className="channel-block">
        <ChannelControls id={id} />
        <traxExt.containers.Channel id={id} enabled={enabled} />
      </div>
    )
  }
}

ChannelItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  enabled: React.PropTypes.bool.isRequired,
}

export default ChannelItem
