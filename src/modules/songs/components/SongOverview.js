import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'
import BlockGrid from './BlockGrid'

class SongOverview extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {song, currentBeat, blocks, onClickBlock, onClickBeat} = this.props
    return (
      <div className="song-overview">
        <BlockGrid currentBeat={currentBeat} blocks={blocks}
          onClickBlock={onClickBlock}
          onClickBeat={onClickBeat} />
      </div>
    )
  }

}

SongOverview.propTypes = {
  song: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  blocks: React.PropTypes.array.isRequired,
  onClickBlock: React.PropTypes.func.isRequired,
  onClickBeat: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {song}) => ({
  blocks: songs.selectors.getBlocks(song.id)(state),
})

const mapDispatchToProps = (dispatch, {song}) => ({
  onClickBlock: (id) => {
    dispatch(url.actions.setBrowserUrl('/songs/' + song.id + '/blocks/' + id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongOverview)
