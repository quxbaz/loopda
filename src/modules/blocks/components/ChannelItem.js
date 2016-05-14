import React from 'react'
import traxExt from '../../trax-ext'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelControls from '../containers/ChannelControls'

class ChannelItem extends PureComponent {
  render() {
    const {id} = this.props
    return (
      <div className="channel-block">
        <ChannelControls id={id} />
        <traxExt.containers.Channel id={id} />
      </div>
    )
  }
}

ChannelItem.propTypes = {
  id: React.PropTypes.string.isRequired
}

export default ChannelItem
