import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import SongGrid from './SongGrid'
import AddLines from './AddLines'

const Song = ({song}) => (
  <div className="song">
    <h4>{song.title}</h4>
    <SongGrid id={song.id} />
    <AddLines id={song.id} />
  </div>
)

Song.propTypes = {
  id: React.PropTypes.string.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state)
})

export default connect(
  mapStateToProps
)(Song)
