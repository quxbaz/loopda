import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelItem from '../components/ChannelItem'

// <TODO> Also show any channels in mute or solo, but not archived
// channels

class ChannelList extends React.Component {

  render() {
    const {channels} = this.props
    return (
      <div className="channel-list">
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
    )
  }

}

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  channels: React.PropTypes.array.isRequired,
  // isSoloMode: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state, {ids}) => ({
  channels: channels.selectors.getMany(ids)(state),
})

export default connect(
  mapStateToProps
)(ChannelList)
