import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import Line from '../components/Line'

class SongGrid extends React.Component {

  render() {
    const {song, onClickCell} = this.props
    return (
      <div className="song-grid">
        {song.data.map((line, i) =>
          <Line key={i} song={song} row={i} cells={line} onClickCell={onClickCell} />
        )}
      </div>
    )
  }

}

SongGrid.propTypes = {
  song: React.PropTypes.object.isRequired,
  onClickCell: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickCell: (position) => {
    dispatch(
      songs.actions.setCursor(id, position)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongGrid)
