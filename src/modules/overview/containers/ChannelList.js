import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ui from '../../ui'
import {PureComponent} from 'loopda/lib/react-ext'
import ArchivedChannel from './ArchivedChannel'
import ChannelBlock from '../components/ChannelBlock'

class ChannelList extends PureComponent {
  renderPagedList() {
    const {channels, pager} = this.props
    const start = pager.size * pager.current
    const end = start + pager.size
    return channels.slice(start, end).map((channel) => {
      if (channel.archived)
        return <ArchivedChannel key={channel.id} id={channel.id} />
      return <ChannelBlock key={channel.id} id={channel.id} />
    })
  }
  render() {
    return (
      <div className="channel-list">
        {this.renderPagedList()}
      </div>
    )
  }
}

ChannelList.propTypes = {
  channels: React.PropTypes.array.isRequired,
  pager: React.PropTypes.object
}

ChannelList.defaultProps = {
  pager: {current: 0, size: 20}
}

// <TODO> Fix: This query creates a new array and breaks identity
// comparison. Should cache the result. Afterwards, it shouldn't
// matter if ChannelList extends PureComponent or not
const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state),
  pager: ui.selectors.getPager(state),
})

export default connect(mapStateToProps)(ChannelList)
