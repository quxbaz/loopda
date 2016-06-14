import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import traxExt from '../../trax-ext'

const ArchivedChannel = ({channel, onClickRestore, onClickDismiss}) => (
  <div className="archived-channel">
    <div className="archived-channel-info">
      <span>{channel.title}</span>
      <div className="archived-channel-controls">
        <a onClick={onClickDismiss}>Dismiss</a>
        <a onClick={onClickRestore}>Undo</a>
      </div>
    </div>
    <traxExt.components.Channel channel={channel} />
  </div>
)

ArchivedChannel.propTypes = {
  channel: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch, {channel}) => ({
  onClickRestore: () => {
    dispatch(channels.actions.restore(channel.id))
  },
  onClickDismiss: () => {
    dispatch(channels.actions.destroy(channel.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(ArchivedChannel)
