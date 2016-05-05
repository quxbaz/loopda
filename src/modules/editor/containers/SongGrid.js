import React from 'react'
import {connect} from 'react-redux'
import {songs, songPlayer} from 'trax'
import Line from '../components/Line'

class SongGrid extends React.Component {

  render() {
    const {song, startLine, onClickCell} = this.props
    return (
      <div className="song-grid">
        {song.data.map((line, i) =>
          <Line key={i} song={song} row={i} cells={line}
           isStartLine={i === startLine}
           onClickCell={onClickCell} />
        )}
      </div>
    )
  }

}

SongGrid.propTypes = {
  song: React.PropTypes.object.isRequired,
  startLine: React.PropTypes.number.isRequired,
  onClickCell: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state),
  startLine: state.songPlayer.startLine,
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickCell: (position) => {
    dispatch(
      songs.actions.setCursor(id, position)
    )
    dispatch(
      songPlayer.actions.setStart(position[1])
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongGrid)
