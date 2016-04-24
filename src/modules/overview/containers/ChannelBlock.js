import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import traxExt from '../../trax-ext'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelControls from './ChannelControls'

class ChannelBlock extends PureComponent {
  render() {
    const {channel} = this.props
    return (
      <div className="channel-block">
        <ChannelControls id={channel.id} />
        <traxExt.containers.Channel channel={channel} />
      </div>
    )
  }
}

ChannelBlock.propTypes = {
  channel: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state)
})

export default connect(
  mapStateToProps
)(ChannelBlock)
