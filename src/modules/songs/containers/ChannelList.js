import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelItem from '../components/ChannelItem'

// <TODO> Also show any channels in mute or solo, but not archived
// channels

const ChannelList = ({channels}) => (
  <div>
    {channels.map((channel) => (
      <ChannelItem key={channel.id} channel={channel} />
    ))}
  </div>
)

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  channels: React.PropTypes.array.isRequired,
  // isSoloMode: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state, {ids}) => ({
  channels: channels.selectors.getMany(ids)(state),
})

const mapDispatchToProps = (dispatch, {ids}) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)
