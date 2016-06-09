import React from 'react'
import {connect} from 'react-redux'
import {blocks, songs, player, songPlayer} from 'trax'
import AddChannel from './AddChannel'
import BlockControls from './BlockControls'
import TempoBar from '../components/TempoBar'
import ChannelList from './ChannelList'
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
    const {id, block, song, i, playing, beatDuration, currentBeat} = this.props
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
          <ChannelList ids={block.channels} />
        </div>
        <div className="sticky-panel-bottom">
          {/*<navPane.containers.NavPane ids={song.blocks} selected={id} />*/}
          <PlaybackControls playing={playing} beatDuration={beatDuration} />
        </div>
      </div>
    )
  }

}

Block.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  i: React.PropTypes.number.isRequired,
  playing: React.PropTypes.bool.isRequired,
  beatDuration: React.PropTypes.number.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
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
    playing: state.player.playing,
    beatDuration: state.player.beatDuration,
    currentBeat: state.player.currentBeat,
  }
}

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: () => {
    // dispatch(songPlayer.actions.stop())
    // dispatch(player.actions.setCurrentBlock(id))
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
