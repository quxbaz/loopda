import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import SongList from './SongList'

class SongControls extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {title: ''}
  }

  resetForm() {
    this.setState({title: ''})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.title.trim() === '')
      return
    this.props.onSubmit(this.state.title)
    this.resetForm()
  }

  handleInputChange(event) {
    this.setState({
      title: event.target.value,
    })
  }

  render() {
    const {onSubmit} = this.props
    return (
      <form className="song-controls" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.title} placeholder="Song title"
          onChange={this.handleInputChange} />
        <button type="submit">Add song</button>
      </form>
    )
  }

}

SongControls.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (title) => {
    const action = songs.actions.createSong({
      title: title.trim(),
    })
    dispatch(action)
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)
