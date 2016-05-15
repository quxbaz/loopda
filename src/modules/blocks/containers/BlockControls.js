import React from 'react'
import {connect} from 'react-redux'
import {blocks} from 'trax'
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
    // <TODO>
    console.log('prev')
  },
  onClickNext: () => {
    // <TODO>
    console.log('next')
  },
  onClickRemove: () => {
    // <TODO> Set browser url to prev block
    dispatch(blocks.actions.removeBlock(block.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(BlockControls)
