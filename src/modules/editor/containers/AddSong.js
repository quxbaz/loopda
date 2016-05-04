import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'
import url from '../../url'

class AddSong extends React.Component {

  constructor(props) {
    super(props)
    this.state = {title: 'Untitled'}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({title: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.state.title)
      return
    this.props.onSubmit(this.state.title)
    this.setState({title: ''})
  }

  render() {
    return (
      <form className="editor-add-song" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.title} placeholder="Song title"
         onChange={this.handleInputChange} />
        <button type="submit">Add song</button>
      </form>
    )
  }

}

AddSong.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (title) => {
    dispatch((dispatch, getState) => {
      const action = songs.actions.createSong({title})
      dispatch(action)
      dispatch(
        url.actions.setBrowserUrl('/songs/' + action.payload.id)
      )
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(AddSong)
