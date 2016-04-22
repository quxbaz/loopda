import React from 'react'
import {connect} from 'react-redux'
import traxExt from '../../trax-ext'

// <TESTING>
import {reactProfile} from 'loopda/lib/perf'

const AddChannel = ({onSelect, onTestSelect}) => (
  <div>
    <strong>Add a channel</strong>
    <ul>
      <li><a onClick={() => onSelect('hihat')}>hihat</a></li>
      <li><a onClick={() => onSelect('snare')}>snare</a></li>
      <li><a onClick={() => onSelect('kick')}>kick</a></li>
      <li><a onClick={() => onSelect('clap')}>clap</a></li>
      <li><a onClick={() => onTestSelect('kick')}>Add ten channels (TEST)</a></li>
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
  onTestSelect: (sample) => {
    setTimeout(() => {
      reactProfile(() => {
        for (let i=0; i < 10; i++)
          dispatch(traxExt.actions.createChannel({sample}))
      }, true)
    }, 0)
  }
})

export default connect(
  null, mapDispatchToProps
)(AddChannel)
