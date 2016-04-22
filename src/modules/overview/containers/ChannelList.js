import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelBlock from './ChannelBlock'
import ArchivedChannel from './ArchivedChannel'

class ChannelList extends PureComponent {
  render() {
    const {channels} = this.props
    return (
      <div className="channel-list">
        {channels.map(channel => {
          if (channel.archived)
            return <ArchivedChannel key={channel.id} id={channel.id} />
          return <ChannelBlock key={channel.id} id={channel.id} />
        })}
      </div>
    )
  }
}

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired
}

// <TODO> Fix: This query creates a new array and breaks identity comparison
const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state)
})

export default connect(mapStateToProps)(ChannelList)
