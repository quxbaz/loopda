import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {player, songPlayer} from 'trax'
import SongHeader from '../providers/SongHeader'
import AddChannel from '../providers/AddChannel'
import BlockControls from '../providers/BlockControls'
import TempoBar from '../providers/TempoBar'
import ChannelList from '../components/ChannelList'
import NavPane from '../providers/NavPane'
import PlaybackControls from '../providers/PlaybackControls'

class Block extends Component {

  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.block.id !== this.props.block.id) {
      this.props.onSwitchBlock(nextProps.block.id)
    }
  }

  render() {
    const {block, order, isSoloMode} = this.props
    return (
      <div className="block overview sequencer">
        <SongHeader id={block.song} />
        <AddChannel block={block.id} />
        <div>Block #{order + 1}</div>
        <BlockControls block={block} />
        <div className="content relative">
          <div className="tempo-bar-wrapper"><TempoBar /></div>
          <ChannelList ids={block.channels} isSoloMode={isSoloMode} />
        </div>
        <div className="sticky-panel-bottom">
          <NavPane songId={block.song} selected={block.id} />
          <PlaybackControls />
        </div>
      </div>
    )
  }

}

Block.propTypes = {
  block: PropTypes.object.isRequired,
  order: PropTypes.number.isRequired,
  isSoloMode: PropTypes.bool.isRequired,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  onSwitchBlock: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {block}) => ({
  onMount() {
    dispatch(songPlayer.actions.stop())
    dispatch(player.actions.setCurrentBlock(block.id))
  },
  onUnmount() {
    dispatch(player.actions.pause())
    dispatch(player.actions.clearCurrentBlock())
  },
  onSwitchBlock(id) {
    dispatch(player.actions.setCurrentBlock(id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Block)
