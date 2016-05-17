import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import last from 'qux/lib/last'
import before from 'qux/lib/before'
import after from 'qux/lib/after'
import {blocks, songs} from 'trax'
import url from '../../url'

const BlockControls = ({isFirstBlock, isLastBlock, onClickPlay, onClickPrev, onClickNext, onClickRemove}) => (
  <div className="block-controls">
    <button onClick={onClickPlay}>Play</button>
    <button onClick={onClickPrev}>Prev</button>
    <button onClick={onClickNext}>{isLastBlock ? 'Add' : 'Next'} block</button>
    <button onClick={onClickRemove}>Remove block</button>
  </div>
)

BlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  isFirstBlock: React.PropTypes.bool,
  isLastBlock: React.PropTypes.bool,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}


BlockControls.defaultProps = {
  isFirstBlock: false, // <TODO>
  isLastBlock: false,
}

const mapStateToProps = (state, {id, song}) => ({
  isFirstBlock: id === song.blocks[0],
  isLastBlock: id === last(song.blocks),
})

const mapDispatchToProps = (dispatch, {id, song}) => ({

  onClickPlay: () => {
    console.log('play')
  },

  onClickPrev: () => {
    if (!song.blocks.includes(id))
      return
    const prevBlock = before(song.blocks, id)
    if (!isNil(prevBlock)) {
      dispatch(url.actions.setBrowserUrl(
        `/songs/${song.id}/blocks/${prevBlock}`
        , {replaceState: true}
      ))
    }
  },

  onClickNext: () => {
    if (!song.blocks.includes(id))
      return
    const nextBlock = after(song.blocks, id)
    if (!isNil(nextBlock)) {
      dispatch(url.actions.setBrowserUrl(
        `/songs/${song.id}/blocks/${nextBlock}` ,
        {replaceState: true}
      ))
    } else {
      const newId = dispatch(blocks.actions.createBlock()).payload.id
      dispatch(songs.actions.addBlock(song.id, newId))
      dispatch(url.actions.setBrowserUrl(
        `/songs/${song.id}/blocks/${newId}`,
        {replaceState: true}
      ))
    }
  },

  onClickRemove: () => {
    dispatch(url.actions.setBrowserUrl('/songs/' + song.id, {replaceState: true}))
    dispatch(blocks.actions.removeBlock(id))
  },

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockControls)
