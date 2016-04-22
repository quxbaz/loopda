import React from 'react'
import {connect} from 'react-redux'
import {PureComponent} from 'loopda/lib/react-ext'
import {channels} from 'trax'
import ui from '../../ui'

class ChannelControls extends PureComponent {

  render() {

    const {channel, onClickTitle, onClickArchive, onClickMute, onClickSolo} = this.props
    const {color, number, title, mute, solo} = channel

    return (
      <div>
        <div className="color-box" style={{background: color}} />
        <div className="channel-text">
          <div className="channel-number hide">{number}</div>
          <div className="channel-title clicky" onClick={onClickTitle}>{title} ({number})</div>
          <a className="archive-channel" onClick={onClickArchive}><ui.Icon name="x" /></a>
        </div>
        <div className="channel-play-controls">
          <ui.Button className="solo-button" state={solo} onClick={onClickSolo}>Solo</ui.Button>
          <ui.Button className="mute-button" state={mute} onClick={onClickMute}>Mute</ui.Button>
        </div>
      </div>
    )

  }

}

ChannelControls.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onClickTitle: React.PropTypes.func,
  onClickArchive: React.PropTypes.func,
  onClickMute: React.PropTypes.func,
  onClickSolo: React.PropTypes.func
}

const mapStateToProps = (state, {id}) => ({
  channel: channels.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickTitle: (/* preset id*/) => {
    /* view preset */
  },
  onClickArchive: () => {
    dispatch(channels.actions.archiveChannel(id))
  },
  onClickMute: () => {
    dispatch(channels.actions.toggleMuteChannel(id))
  },
  onClickSolo: () => {
    dispatch(channels.actions.toggleSoloChannel(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelControls)
