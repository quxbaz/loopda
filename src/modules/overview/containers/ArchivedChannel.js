import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import traxExt from '../../trax-ext'

const ArchivedChannel = ({channel, onClickRestore, onClickDismiss}) => {

  let {id, number, title, blips} = channel

  let handleRestore = () => onClickRestore(id)
  let handleDismiss = () => onClickDismiss(id)

  return (
    <div className="archived-channel">
      <div className="archived-channel-info">
        <span>{title}</span>
        <div className="archived-channel-controls">
          <a onClick={handleDismiss}>Dismiss</a>
          <a onClick={handleRestore}>Undo</a>
        </div>
      </div>
      <traxExt.containers.Channel channel={channel} />
    </div>
  )

}

ArchivedChannel.propTypes = {
  channel: React.PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onClickRestore: (id) => {
    dispatch(channels.actions.restoreChannel(id))
  },
  onClickDismiss: (id) => {
    dispatch(channels.actions.removeChannel(id))
  }
})

export default connect(
  null, mapDispatchToProps
)(ArchivedChannel)
