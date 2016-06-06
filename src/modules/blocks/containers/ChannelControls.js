import React from 'react'
import {connect} from 'react-redux'
import {PureComponent} from 'loopda/lib/react-ext'
import {channels} from 'trax'
import ui from '../../ui'
import url from '../../url'

const {Button, Icon} = ui.components

class ChannelControls extends PureComponent {

  render() {

    const {channel, onClickTitle, onClickArchive, onClickMute, onClickSolo} = this.props
    const {color, /*number,*/ title, mute, solo} = channel

    return (
      <div className="channel-controls">
        <div className="color-box" style={{background: color}} />
        <div className="channel-text">
          <div className="channel-title clicky" onClick={onClickTitle}>{title}</div>
          <a className="archive-channel" onClick={onClickArchive}><Icon name="x" /></a>
        </div>
        <div className="channel-play-controls">
          <Button className="solo-button" state={solo} onClick={onClickSolo}>Solo</Button>
          <Button className="mute-button" state={mute} onClick={onClickMute}>Mute</Button>
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
  onClickTitle: () => {
    dispatch((dispatch, getState) => {
      const state = getState()
      const channel = channels.selectors.getById(id)(state)
      dispatch(
        url.actions.setBrowserUrl('/presets/' + channel.preset)
      )
    })
  },
  onClickArchive: () => {
    dispatch(channels.actions.archive(id))
  },
  onClickMute: () => {
    dispatch(channels.actions.toggleMute(id))
  },
  onClickSolo: () => {
    dispatch(channels.actions.toggleSolo(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelControls)
