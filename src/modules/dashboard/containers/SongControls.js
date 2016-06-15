import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import actions from '../actions'

class SongControls extends Component {

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
        <div className="text-submit">
          <input type="text" value={this.state.title} placeholder="What's the name of your song?"
            onChange={this.handleInputChange} />
          <button type="submit">Create new song</button>
        </div>
      </form>
    )
  }

}

SongControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (title) => {
    dispatch(actions.createDefaultSong(title))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(SongControls)
