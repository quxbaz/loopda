import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import before from 'qux/lib/before'
import after from 'qux/lib/after'
import {blocks, songs} from 'trax'
import url from '../../url'

const BlockControls = (props) => (
  <div className="block-controls">
    <button onClick={props.onClickAdd}>Add block</button>
    <button onClick={props.onClickDupe}>Duplicate block</button>
    <button onClick={props.onClickDestroy}>Remove block</button>
  </div>
)

BlockControls.propTypes = {
  block: React.PropTypes.object.isRequired,
  song: React.PropTypes.object.isRequired,
  onClickAdd: React.PropTypes.func.isRequired,
  onClickDupe: React.PropTypes.func.isRequired,
  onClickDestroy: React.PropTypes.func.isRequired,
}

const makeMapDispatchToProps = (_, {block, song}) => (dispatch) => ({

  onClickAdd() {
    const index = song.blocks.indexOf(block.id)
    dispatch(songs.actions.createBlockAt(song.id, index + 1))
  },

  onClickDupe() {
    const index = song.blocks.indexOf(block.id)
    const blockId = dispatch(blocks.actions.deepCopy(block.id)).payload.copy.id
    dispatch(songs.actions.addBlockAt(song.id, blockId, index + 1))
  },

  onClickDestroy() {
    if (!song.blocks.includes(block.id))
      return
    const prevBlock = before(song.blocks, block.id)
    const nextBlock = after(song.blocks, block.id)
    if (!isNil(prevBlock)) {
      dispatch(url.actions.setBrowserUrl(
        '/blocks/' + prevBlock , {replaceState: true}
      ))
    } else if (!isNil(nextBlock)) {
      dispatch(url.actions.setBrowserUrl(
        '/blocks/' + nextBlock, {replaceState: true}
      ))
    } else {
      dispatch(url.actions.setBrowserUrl(
        '/songs/' + song.id, {replaceState: true}
      ))
    }
    dispatch(blocks.actions.destroy(block.id))
  },

})

export default connect(
  null,
  makeMapDispatchToProps
)(BlockControls)
