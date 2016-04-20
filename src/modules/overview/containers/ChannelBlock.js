import React from 'react'
import {connect} from 'react-redux'
import trax from '../../trax'
import ChannelControls from './ChannelControls'

const ChannelBlock = ({channel}) => (
  <div className="channel-block">
    <ChannelControls channel={channel} />
    <trax.containers.Channel channel={channel} />
  </div>
)

ChannelBlock.propTypes = {
  channel: React.PropTypes.object.isRequired
}

const mapDispatchToProps = (state, props) => ({
  onClickMute: (id) => {},
  onClickArchive: (id) => {}
})

export default connect(
  mapDispatchToProps
)(ChannelBlock)
