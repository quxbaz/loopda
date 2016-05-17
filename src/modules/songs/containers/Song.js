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
import SongControls from '../components/SongControls'
import SongOverview from '../components/SongOverview'

const BlockWrapper = ({id, blocks, onClickPrevBlock, onClickNextBlock, onClickRemoveBlock}) => (
  <blocksModule.containers.Block id={id}
    isLastBlock={id === last(blocks)}
    onClickPrevBlock={onClickPrevBlock}
    onClickNextBlock={onClickNextBlock}
    onClickRemoveBlock={onClickRemoveBlock} />
)

BlockWrapper.propTypes = {
  id: React.PropTypes.string,
  blocks: React.PropTypes.array.isRequired,
  onClickPrevBlock: React.PropTypes.func.isRequired,
  onClickNextBlock: React.PropTypes.func.isRequired,
  onClickRemoveBlock: React.PropTypes.func.isRequired,
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
      song, playing,
      onClickRestart, onClickPlay, onClickPause, onClickStop,
      onClickNextBlock, onClickPrevBlock, onClickAddBlock, onClickRemoveBlock,
    } = this.props
    return (
      <div className="song">
        <h2>{song.title}</h2>
        <Route route="/">
          <SongControls playing={playing}
            onClickRestart={onClickRestart}
            onClickPlay={onClickPlay}
            onClickPause={onClickPause}
            onClickStop={onClickStop} />
          <button onClick={onClickAddBlock}>Add block</button>
          <SongOverview song={song} />
        </Route>
        <Route route="/blocks/:id">
          <BlockWrapper blocks={song.blocks}
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
  playing: React.PropTypes.bool.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  onSwitchSong: React.PropTypes.func.isRequired,
  onClickRestart: React.PropTypes.func.isRequired,
  onClickPlay: React.PropTypes.func.isRequired,
  onClickPause: React.PropTypes.func.isRequired,
  onClickStop: React.PropTypes.func.isRequired,
  onClickPrevBlock: React.PropTypes.func.isRequired,
  onClickNextBlock: React.PropTypes.func.isRequired,
  onClickAddBlock: React.PropTypes.func.isRequired,
  onClickRemoveBlock: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
  playing: state.songPlayer.playing,
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
  onClickRestart: () => {
    window.loopda.audioPlayer.restartSong()
  },
  onClickPlay: () => {
    window.loopda.audioPlayer.startSong()
  },
  onClickPause: () => {
    window.loopda.audioPlayer.pauseSong()
  },
  onClickStop: () => {
    window.loopda.audioPlayer.stopSong()
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
  onClickAddBlock: () => {
    const blockAction = blocks.actions.createBlock()
    dispatch(blockAction)
    dispatch(songs.actions.addBlock(id, blockAction.payload.id))
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
