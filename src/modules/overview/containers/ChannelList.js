import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import ArchivedChannel from './ArchivedChannel'
import ListItem from '../components/ListItem'

class ChannelList extends PureComponent {
  renderChannels() {
    const {channels} = this.props
    return channels.map((channel) => {
      if (channel.archived)
        return <ArchivedChannel key={channel.id} id={channel.id} />
      return <ListItem key={channel.id} id={channel.id} />
    })
  }
  render() {
    return (
      <div className="channel-list">
        {this.renderChannels()}
      </div>
    )
  }
}

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired,
}

// <TODO> Fix: This query creates a new array and breaks identity
// comparison. Should cache the result. Afterwards, it shouldn't
// matter if ChannelList extends PureComponent or not
const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state),
})

export default connect(mapStateToProps)(ChannelList)
