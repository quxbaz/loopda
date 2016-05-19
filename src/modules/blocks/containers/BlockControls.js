import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import last from 'qux/lib/last'
import before from 'qux/lib/before'
import after from 'qux/lib/after'
import {blocks, songs, player} from 'trax'
import url from '../../url'
import ux from '../../ux'

const BlockControls = ({playing, isFirstBlock, isLastBlock, onClickPlay, onClickPrev, onClickNext, onClickRemove}) => (
  <div className="block-controls">
    <ux.KeyWatcher onKeySpace={onClickPlay} />
    <div>
      <button onClick={onClickPlay}>{playing ? 'Pause' : 'Play'} (space)</button>
    </div>
    <button disabled={isFirstBlock} onClick={onClickPrev}>Prev</button>
    <button onClick={onClickNext}>{isLastBlock ? 'Add' : 'Next'} block</button>
    <button onClick={onClickRemove}>Remove block</button>
  </div>
)

BlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  playing: React.PropTypes.bool.isRequired,
  isFirstBlock: React.PropTypes.bool.isRequired,
  isLastBlock: React.PropTypes.bool.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}


BlockControls.defaultProps = {
  isFirstBlock: false,
  isLastBlock: false,
}

const mapStateToProps = (state, {id, song}) => ({
  playing: state.player.playing,
  isFirstBlock: id === song.blocks[0],
  isLastBlock: id === last(song.blocks),
})

const mapDispatchToProps = (dispatch, {id, song}) => ({

  onClickPlay: () => {
    dispatch(player.actions.togglePlay())
  },

  onClickPrev: () => {
    if (!song.blocks.includes(id))
      return
    const prevBlock = before(song.blocks, id)
    if (!isNil(prevBlock)) {
      dispatch(url.actions.setBrowserUrl(
        '/blocks/' + prevBlock , {replaceState: true}
      ))
    }
  },

  onClickNext: () => {
    if (!song.blocks.includes(id))
      return
    const nextBlock = after(song.blocks, id)
    if (!isNil(nextBlock)) {
      dispatch(url.actions.setBrowserUrl(
        '/blocks/' + nextBlock, {replaceState: true}
      ))
    } else {
      const blockId = dispatch(songs.actions.createBlock(song.id)).payload.id
      dispatch(url.actions.setBrowserUrl('/blocks/' + blockId, {replaceState: true}))
    }
  },

  onClickRemove: () => {
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
    dispatch(blocks.actions.removeBlock(id))
  },

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockControls)
