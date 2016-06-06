import React from 'react'
import {connect} from 'react-redux'
import {blocks, songs, player, songPlayer} from 'trax'
import AddChannel from './AddChannel'
import BlockControls from './BlockControls'
import TempoBar from '../components/TempoBar'
import ChannelList from '../components/ChannelList'
import navPane from '../../nav-pane'
import PlaybackControls from './PlaybackControls'

class Block extends React.Component {

  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id)
      this.props.onSwitchBlock(nextProps.id)
  }

  render() {
    const {id, song, i, channels, playing, beatDuration, currentBeat, isSoloMode} = this.props
    return (
      <div className="block overview sequencer">
        <h2><a href={'/#/songs/' + song.id}>{song.title}</a></h2>
        <AddChannel id={id} />
        <div>Block #{i + 1}</div>
        <BlockControls id={id} song={song} />
        <div className="content relative">
          <div className="tempo-bar-wrapper">
            <TempoBar beat={currentBeat} />
          </div>
          <ChannelList channels={channels} isSoloMode={isSoloMode} />
        </div>
        <div className="sticky-panel-bottom">
          <navPane.containers.NavPane ids={song.blocks} selected={id} />
          <PlaybackControls playing={playing} beatDuration={beatDuration} />
        </div>
      </div>
    )
  }

}

Block.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  block: React.PropTypes.object.isRequired,
  i: React.PropTypes.number.isRequired,
  channels: React.PropTypes.array.isRequired,
  playing: React.PropTypes.bool.isRequired,
  beatDuration: React.PropTypes.number.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchBlock: React.PropTypes.func.isRequired,
}


const mapStateToProps = (state, {id}) => {
  const block = blocks.selectors.getById(id)(state)
  const song = songs.selectors.getById(block.song)(state)
  return {
    block,
    song,
    i: song.blocks.indexOf(id),
    channels: blocks.selectors.getChannels(id)(state),
    playing: state.player.playing,
    beatDuration: state.player.beatDuration,
    currentBeat: state.player.currentBeat,
    isSoloMode: blocks.selectors.isSoloMode(id)(state),
  }
}

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: () => {
    dispatch(songPlayer.actions.stop())
    dispatch(player.actions.setCurrentBlock(id))
  },
  onUnmount: () => {
    dispatch(player.actions.pause())
    dispatch(player.actions.clearCurrentBlock())
  },
  onSwitchBlock: (id) => {
    dispatch(player.actions.setCurrentBlock(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block)
