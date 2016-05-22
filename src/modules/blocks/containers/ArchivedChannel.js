import React from 'react'
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
  channel: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickRestore: () => {
    dispatch(channels.actions.restore(id))
  },
  onClickDismiss: () => {
    dispatch(channels.actions.destroy(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedChannel)
