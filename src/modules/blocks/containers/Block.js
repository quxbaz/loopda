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
    const {
      id, block, currentBeat, isSoloMode,
      onClickPrevBlock, onClickNextBlock, onClickRemoveBlock,
    } = this.props
    return (
      <div className="block">
        <AddChannel id={id} />
        <BlockControls id={id}
          onClickPrev={onClickPrevBlock}
          onClickNext={onClickNextBlock}
          onClickRemove={onClickRemoveBlock} />
        <div className="relative">
          <TempoBar beat={currentBeat} />
          <ChannelList ids={block.channels} isSoloMode={isSoloMode} />
        </div>
      </div>
    )
  }

}

Block.propTypes = {
  id: React.PropTypes.string.isRequired,
  block: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onClickPrevBlock: React.PropTypes.func.isRequired,
  onClickNextBlock: React.PropTypes.func.isRequired,
  onClickRemoveBlock: React.PropTypes.func.isRequired,
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
