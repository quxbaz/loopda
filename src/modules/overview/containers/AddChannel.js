import React from 'react'
import {connect} from 'react-redux'
import traxExt from '../../trax-ext'

const AddChannel = ({onSelect, onTestSelect}) => (
  <div>
    <strong>Add a channel</strong>
    <ul>
      <li><a onClick={() => onSelect('hihat')}>hihat</a></li>
      <li><a onClick={() => onSelect('snare')}>snare</a></li>
      <li><a onClick={() => onSelect('kick')}>kick</a></li>
      <li><a onClick={() => onSelect('clap')}>clap</a></li>
      <li><a onClick={() => onTestSelect('kick', 10)}>Add 10 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect('kick', 50)}>Add 50 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect('kick', 100)}>Add 100 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect('kick', 500)}>Add 500 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect('kick', 1000)}>Add 1000 channels (TEST)</a></li>
    </ul>
  </div>
)

AddChannel.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSelect: (sample) => {
    dispatch(traxExt.actions.createChannel({sample}))
  },
  onTestSelect: (sample, n=10) => {
    for (let i=0; i < n; i++)
      dispatch(traxExt.actions.createChannel({sample}))
  }
})

export default connect(
  null, mapDispatchToProps
)(AddChannel)
