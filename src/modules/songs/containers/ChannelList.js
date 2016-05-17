import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelItem from '../components/ChannelItem'

class ChannelList extends React.Component {

  render() {
    const {channels, isSoloMode} = this.props
    return (
      <div className="channel-list">
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel}
            enabled={(isSoloMode && channel.solo) || (!isSoloMode && !channel.mute)} />
        ))}
      </div>
    )
  }

}

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  channels: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state, {ids}) => ({
  channels: channels.selectors.getMany(ids)(state).filter(
    c => !c.archived
  ),
})

export default connect(
  mapStateToProps
)(ChannelList)
