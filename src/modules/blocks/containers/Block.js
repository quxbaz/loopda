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

  render() {
    const {block, currentBeat, isSoloMode} = this.props
    return (
      <div className="block">
        <AddChannel id={block.id} />
        <BlockControls block={block} />
        <div className="relative">
          <TempoBar beat={currentBeat} />
          <ChannelList ids={block.channels} isSoloMode={isSoloMode} />
        </div>
      </div>
    )
  }

}

Block.propTypes = {
  block: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  block: blocks.selectors.getById(id)(state),
  currentBeat: state.player.currentBeat,
  isSoloMode: blocks.selectors.isSoloMode(id)(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: () => {
    dispatch(player.actions.setCurrentBlock(id))
    dispatch(player.actions.restart())
  },
  onUnmount: () => {
    dispatch(player.actions.pause())
    dispatch(player.actions.clearCurrentBlock())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block)
