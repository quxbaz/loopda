import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import before from 'qux/lib/before'
import after from 'qux/lib/after'
import {blocks, songs, player} from 'trax'
import url from '../../url'
import ux from '../../ux'

const BlockControls = (props) => (
  <div className="block-controls">
    <ux.KeyWatcher onKeySpace={props.onClickPlay} />
    <div>
      <button onClick={props.onClickPlay}>{props.playing ? 'Pause' : 'Play'} (space)</button>
    </div>
    <button onClick={props.onClickAdd}>Add block</button>
    <button onClick={props.onClickDupe}>Duplicate block</button>
    <button onClick={props.onClickDestroy}>Remove block</button>
  </div>
)

BlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  playing: React.PropTypes.bool.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickAdd: React.PropTypes.func.isRequired,
  onClickDupe: React.PropTypes.func.isRequired,
  onClickDestroy: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id, song}) => ({
  playing: state.player.playing,
})

const mapDispatchToProps = (dispatch, {id, song}) => ({

  onClickPlay() {
    dispatch(player.actions.togglePlay())
  },

  onClickAdd() {
    const index = song.blocks.indexOf(id)
    dispatch(songs.actions.createBlockAt(song.id, index + 1))
  },

  onClickDupe() {
    console.log('dupe')
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
  mapStateToProps,
  mapDispatchToProps
)(BlockControls)
