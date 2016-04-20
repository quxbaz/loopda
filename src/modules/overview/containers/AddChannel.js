import React from 'react'
import {connect} from 'react-redux'
import traxExt from '../../trax-ext'

const AddChannel = ({onSelect}) => (
  <div>
    <strong>Add a channel</strong>
    <ul>
      <li><a onClick={() => onSelect('hihat')}>hihat</a></li>
      <li><a onClick={() => onSelect('snare')}>snare</a></li>
      <li><a onClick={() => onSelect('kick')}>kick</a></li>
      <li><a onClick={() => onSelect('clap')}>clap</a></li>
    </ul>
  </div>
)

AddChannel.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSelect: (sample) => {
    dispatch(
      traxExt.actions.createChannel({sample})
    )
  }
})

export default connect(
  null, mapDispatchToProps
)(AddChannel)
