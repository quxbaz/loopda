import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelBlock from './ChannelBlock'

const ChannelList = ({channels}) => (
  <div className="channel-list">
    {channels.map(channel =>
      <ChannelBlock key={channel.id} channel={channel} />
    )}
  </div>
)

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state)
})

export default connect(mapStateToProps)(ChannelList)
