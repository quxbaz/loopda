import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ChannelBlock from './ChannelBlock'
import ArchivedChannel from './ArchivedChannel'

const ChannelList = ({channels}) => (
  <div className="channel-list">
    {channels.map(channel => {
      if (channel.archived)
        return <ArchivedChannel key={channel.id} channel={channel} />
      return <ChannelBlock key={channel.id} id={channel.id} />
    })}
  </div>
)

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state)
})

export default connect(mapStateToProps)(ChannelList)
