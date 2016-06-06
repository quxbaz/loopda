import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import before from 'qux/lib/before'
import after from 'qux/lib/after'
import {blocks, songs, player} from 'trax'
import url from '../../url'

const BlockControls = (props) => (
  <div className="block-controls">
    <button onClick={props.onClickAdd}>Add block</button>
    <button onClick={props.onClickDupe}>Duplicate block</button>
    <button onClick={props.onClickDestroy}>Remove block</button>
  </div>
)

BlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  onClickAdd: React.PropTypes.func.isRequired,
  onClickDupe: React.PropTypes.func.isRequired,
  onClickDestroy: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {id, song}) => ({

  onClickAdd() {
    const index = song.blocks.indexOf(id)
    dispatch(songs.actions.createBlockAt(song.id, index + 1))
  },

  onClickDupe() {
    const index = song.blocks.indexOf(id)
    const blockId = dispatch(blocks.actions.deepCopy(id)).payload.copy.id
    dispatch(songs.actions.addBlockAt(song.id, blockId, index + 1))
  },

  onClickDestroy() {
    if (!song.blocks.includes(id))
      return
    const prevBlock = before(song.blocks, id)
    const nextBlock = after(song.blocks, id)
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
    dispatch(blocks.actions.destroy(id))
  },

})

export default connect(
  null,
  mapDispatchToProps
)(BlockControls)
