import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import ArchivedChannel from './ArchivedChannel'
import NormalChannel from '../components/NormalChannel'

class ChannelItem extends PureComponent {
  render() {
    const {channel, isSoloMode} = this.props
    const {archived} = channel
    return (
      <div className="channel-block">
        {archived ?
          <ArchivedChannel channel={channel} /> :
          <NormalChannel channel={channel} isSoloMode={isSoloMode} />}
      </div>
    )
  }
}

ChannelItem.propTypes = {
  channel: React.PropTypes.object.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state),
})

export default connect(
  mapStateToProps
)(ChannelItem)
