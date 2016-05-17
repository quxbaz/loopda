import React from 'react'
import {connect} from 'react-redux'
import {blocks, player} from 'trax'
import AddChannel from './AddChannel'
import BlockControls from './BlockControls'
import TempoBar from '../components/TempoBar'
import ChannelList from './ChannelList'

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
    const {id, block, song, i, currentBeat, isSoloMode} = this.props
    return (
      <div className="block">
        <AddChannel id={id} />
        <div>Block #{i + 1}</div>
        <BlockControls id={id} song={song} />
        <div className="relative">
          <div className="tempo-bar-wrapper">
            <TempoBar beat={currentBeat} />
          </div>
          <ChannelList ids={block.channels} isSoloMode={isSoloMode} />
        </div>
      </div>
    )
  }

}

Block.propTypes = {
  id: React.PropTypes.string.isRequired,
  block: React.PropTypes.object.isRequired,
  song: React.PropTypes.object.isRequired,
  i: React.PropTypes.number.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchBlock: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id, song}) => ({
  block: blocks.selectors.getById(id)(state),
  i: song.blocks.indexOf(id),
  currentBeat: state.player.currentBeat,
  isSoloMode: blocks.selectors.isSoloMode(id)(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: () => {
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
