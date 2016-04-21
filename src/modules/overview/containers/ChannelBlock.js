import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import traxExt from '../../trax-ext'
import ChannelControls from './ChannelControls'

const ChannelBlock = ({channel}) => (
  <div className="channel-block">
    <ChannelControls id={channel.id} />
    <traxExt.components.Channel channel={channel} />
  </div>
)

ChannelBlock.propTypes = {
  channel: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state)
})

export default connect(
  mapStateToProps
)(ChannelBlock)
