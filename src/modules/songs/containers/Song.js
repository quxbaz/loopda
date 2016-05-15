import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import {songs, songPlayer} from 'trax'
import blocks from '../../blocks'

class Song extends React.Component {

  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  render() {
    const {song} = this.props
    return (
      <div className="song">
        <h2>{song.title}</h2>
        <Route route="/blocks/:id">
          <blocks.containers.Block />
        </Route>
      </div>
    )
  }

}

Song.propTypes = {
  song: React.PropTypes.object.isRequired,
  onMount: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song)
