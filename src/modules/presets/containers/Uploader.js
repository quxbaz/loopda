import React from 'react'
import {connect} from 'react-redux'

// TEST
import audioContext from 'loopda/src/globals/audioContext'
import audioService from 'loopda/src/globals/audioService'
import {loadAudioFile} from 'loopda/src//audio/audiohelper'
import audio from '../../audio'

class Uploader extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onChange(event, this.refs.input)
  }

  render() {
    return (
      <div>
        <input ref="input" type="file" multiple onChange={this.handleChange} />
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  onChange: (event, input) => {
    for (let i=0; i < input.files.length; i++) {
      loadAudioFile(dispatch, input.files[i])
    }
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Uploader)
