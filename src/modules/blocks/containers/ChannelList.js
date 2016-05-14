import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import ArchivedChannel from './ArchivedChannel'
import ChannelItem from '../components/ChannelItem'

class ChannelList extends PureComponent {
  render() {
    const {channels} = this.props
    return (
      <div className="channel-list">
        {channels.map((channel) => (
          channel.archived ?
            <ArchivedChannel key={channel.id} id={channel.id} /> :
            <ChannelItem key={channel.id} id={channel.id} />
        ))}
      </div>
    )
  }
}

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  channels: React.PropTypes.array.isRequired,
}

// <TODO> Fix: This query creates a new array and breaks identity
// comparison. Should cache the result. Afterwards, it shouldn't
// matter if ChannelList extends PureComponent or not
const mapStateToProps = (state, {ids}) => ({
  channels: channels.selectors.getMany(ids)(state),
})

export default connect(
  mapStateToProps
)(ChannelList)
