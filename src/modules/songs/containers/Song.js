import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import last from 'qux/lib/last'
import after from 'qux/lib/after'
import before from 'qux/lib/before'
import {Route} from 'stateful-router'
import {blocks, songs, songPlayer} from 'trax'
import blocksModule from '../../blocks'
import url from '../../url'
import SongControls from './SongControls'
import SongOverview from './SongOverview'

const BlockWrapper = ({id, blocks, onClickPlay, onClickPrev, onClickNext, onClickRemove}) => (
  <blocksModule.containers.Block id={id}
    isLastBlock={id === last(blocks)}
    onClickPlay={onClickPlay}
    onClickPrev={onClickPrev}
    onClickNext={onClickNext}
    onClickRemove={onClickRemove} />
)

BlockWrapper.propTypes = {
  id: React.PropTypes.string,
  blocks: React.PropTypes.array.isRequired,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}

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
    const {
      id, song, songPlayer,
      onClickPlayBlock, onClickPrevBlock, onClickNextBlock, onClickRemoveBlock,
    } = this.props
    return (
      <div className="song">
        <h2>{song.title}</h2>
        <Route route="/">
          <SongControls id={id} playing={songPlayer.playing} />
          <SongOverview song={song} currentBeat={songPlayer.currentBeat} />
        </Route>
        <Route route="/blocks/:id">
          <BlockWrapper blocks={song.blocks}
            onClickPlay={onClickPlayBlock}
            onClickPrev={onClickPrevBlock}
            onClickNext={onClickNextBlock}
            onClickRemove={onClickRemoveBlock} />
        </Route>
      </div>
    )
  }

}

Song.propTypes = {
  id: React.PropTypes.string.isRequired,
  song: React.PropTypes.object.isRequired,
  songPlayer: React.PropTypes.object.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchSong: React.PropTypes.func.isRequired,
  onClickPlayBlock: React.PropTypes.func.isRequired,
  onClickPrevBlock: React.PropTypes.func.isRequired,
  onClickNextBlock: React.PropTypes.func.isRequired,
  onClickRemoveBlock: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
  songPlayer: state.songPlayer,
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

  onClickPlayBlock: () => {
    console.log('play')
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
    dispatch(url.actions.setBrowserUrl('/songs/' + id, {replaceState: true}))
    dispatch(blocks.actions.removeBlock(blockId))
  },

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song)
