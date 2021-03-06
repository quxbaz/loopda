import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import audio from '../../audio'
import url from '../../url'
import {presets} from 'trax'
import SampleSelect from '../components/SampleSelect'

class AddPreset extends Component {

  constructor(props) {
    super(props)
    this.defaultTitle = 'untitled'
    this.state = {
      title: this.defaultTitle,
      sample: 'hihat',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({title: event.target.value})
  }

  handleSelectChange(event) {
    this.setState({sample: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.state.title || !this.state.sample)
      return
    this.props.onSubmit(this.state.title, this.state.sample)
    this.resetForm()
  }

  resetForm() {
    this.setState({title: this.defaultTitle})
  }

  render() {
    const {samples, onSubmit} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.title} onChange={this.handleInputChange} />
        <SampleSelect value={this.state.sample} samples={samples} onChange={this.handleSelectChange} />
        <button type="submit">Add preset</button>
      </form>
    )
  }

}

AddPreset.propTypes = {
  samples: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit(title, sample) {
    const action = dispatch(presets.actions.create({title, sample}))
    dispatch(url.actions.setBrowserUrl('/presets/' + action.payload.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(AddPreset)
