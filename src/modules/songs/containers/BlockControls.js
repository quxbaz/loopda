import React from 'react'
import {connect} from 'react-redux'
import {blocks, blockAdmin} from 'trax'
import url from '../../url'

const BlockControls = ({block, onClickPrev, onClickNext, onClickRemove}) => (
  <div className="block-controls">
    <button onClick={onClickPrev}>Prev</button>
    <button onClick={onClickNext}>Next block</button>
    <button onClick={onClickRemove}>Remove block</button>
  </div>
)

BlockControls.propTypes = {
  block: React.PropTypes.object.isRequired,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {block}) => ({
  onClickPrev: () => {
    dispatch(blockAdmin.actions.prevBlock())
  },
  onClickNext: () => {
    dispatch(blockAdmin.actions.nextBlock(true))
  },
  onClickRemove: () => {
    dispatch(url.actions.setBrowserUrl('/'))
    dispatch(blocks.actions.removeBlock(block.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(BlockControls)
