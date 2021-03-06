import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {PureComponent} from 'loopda/lib/react-ext'
import {channels} from 'trax'
import ui from '../../ui'
import url from '../../url'

const {Button, Icon} = ui.components

class ChannelControls extends PureComponent {
  render() {
    const {props} = this
    const {color, solo, mute} = props.channel
    return (
      <div className="channel-controls">
        <div className="color-box" style={{background: color}} />
        <div className="channel-text">
          <div className="channel-title clicky" onClick={props.onClickTitle}>{props.presetTitle}</div>
          <a className="archive-channel" onClick={props.onClickArchive}><Icon name="x" /></a>
        </div>
        <div className="channel-play-controls">
          <Button className="solo-button" state={solo} onClick={props.onClickSolo}>Solo</Button>
          <Button className="mute-button" state={mute} onClick={props.onClickMute}>Mute</Button>
        </div>
      </div>
    )
  }
}

ChannelControls.propTypes = {
  channel: PropTypes.object.isRequired,
  presetTitle: PropTypes.string.isRequired,
  onClickTitle: PropTypes.func,
  onClickArchive: PropTypes.func,
  onClickMute: PropTypes.func,
  onClickSolo: PropTypes.func
}

const mapDispatchToProps = (dispatch, {channel}) => ({
  onClickTitle: () => {
    const action = url.actions.setBrowserUrl('/presets/' + channel.preset)
    dispatch(action)
  },
  onClickArchive: () => {
    dispatch(channels.actions.archive(channel.id))
  },
  onClickMute: () => {
    dispatch(channels.actions.toggleMute(channel.id))
  },
  onClickSolo: () => {
    dispatch(channels.actions.toggleSolo(channel.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(ChannelControls)
