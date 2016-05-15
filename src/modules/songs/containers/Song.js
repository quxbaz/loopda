import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import after from 'qux/lib/after'
import before from 'qux/lib/before'
import {Route} from 'stateful-router'
import {blocks, songs, songPlayer} from 'trax'
import blocksModule from '../../blocks'
import url from '../../url'

class Song extends React.Component {

  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id)
      this.props.onSwitchSong(nextProps.id)
  }

  render() {
    const {song, onClickPrevBlock, onClickNextBlock, onClickRemoveBlock} = this.props
    return (
      <div className="song">
        <h2>{song.title}</h2>
        <Route route="/blocks/:id">
          <blocksModule.containers.Block
            onClickPrevBlock={onClickPrevBlock}
            onClickNextBlock={onClickNextBlock}
            onClickRemoveBlock={onClickRemoveBlock} />
        </Route>
      </div>
    )
  }

}

Song.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchSong: React.PropTypes.func.isRequired,
  onClickPrevBlock: React.PropTypes.func.isRequired,
  onClickNextBlock: React.PropTypes.func.isRequired,
  onClickRemoveBlock: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: () => {
    dispatch(songPlayer.actions.setCurrentSong(id))
  },
  onUnmount: () => {
    dispatch(songPlayer.actions.stop())
    dispatch(songPlayer.actions.clearCurrentSong())
  },
  onSwitchSong: (id) => {
    dispatch(songPlayer.actions.setCurrentSong(id))
  },
  onClickPrevBlock: (blockId) => {
    dispatch((dispatch, getState) => {
      const song = songs.selectors.getById(id)(getState())
      if (!song.blocks.includes(blockId))
        return
      const prevBlock = before(song.blocks, blockId)
      if (!isNil(prevBlock)) {
        dispatch(url.actions.setBrowserUrl(
          `/songs/${id}/blocks/${prevBlock}`
          , {replaceState: true}
        ))
      }
    })
  },
  onClickNextBlock: (blockId) => {
    dispatch((dispatch, getState) => {
      const song = songs.selectors.getById(id)(getState())
      if (!song.blocks.includes(blockId))
        return
      const nextBlock = after(song.blocks, blockId)
      if (!isNil(nextBlock)) {
        dispatch(url.actions.setBrowserUrl(
          `/songs/${id}/blocks/${nextBlock}` ,
          {replaceState: true}
        ))
      } else {
        const blockAction = blocks.actions.createBlock()
        dispatch(blockAction)
        dispatch(songs.actions.addBlock(id, blockAction.payload.id))
        dispatch(url.actions.setBrowserUrl(
          `/songs/${id}/blocks/${blockAction.payload.id}`,
          {replaceState: true}
        ))
      }
    })
  },
  onClickRemoveBlock: (blockId) => {
    // <TODO>
    console.log('remove')
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song)
