import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import ui from '../../ui'

const ChannelControls = ({
  channel, onClickTitle, onClickArchive, onClickMute, onClickSolo
}) => {

  const {id, color, number, title, mute, solo} = channel
  const handleClickTitle = () => onClickTitle(/*preset id*/)
  const handleClickArchive = () => onClickArchive(id)
  const handleClickMute = () => onClickMute(id)
  const handleClickSolo = () => onClickSolo(id)

  return (
    <div className="channel-controls">
      <div className="color-box" style={{background: channel.color}} />
      <div className="channel-text">
        <div className="channel-number hide">{number}</div>
        <div className="channel-title clicky" onClick={handleClickTitle}>{title} ({number})</div>
        <a className="archive-channel" onClick={handleClickArchive}><ui.Icon name="x" /></a>
      </div>
      <div className="channel-play-controls">
        <ui.Button className="solo-button" state={solo} onClick={handleClickSolo}>Solo</ui.Button>
        <ui.Button className="mute-button" state={mute} onClick={handleClickMute}>Mute</ui.Button>
      </div>
    </div>
  )

}

ChannelControls.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onClickTitle: React.PropTypes.func,
  onClickArchive: React.PropTypes.func,
  onClickMute: React.PropTypes.func,
  onClickSolo: React.PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  onClickTitle: (id) => {
    /* view preset */
  },
  onClickArchive: (id) => {
    /* archive channel */
  },
  onClickMute: (id) => {
    /* toggle mute channel */
  },
  onClickSolo: (id) => {
    /* toggle solo channel */
  }
})

export default connect(
  null, mapDispatchToProps
)(ChannelControls)
