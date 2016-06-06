import React from 'react'
import {connect} from 'react-redux'
import {blocks, presets} from 'trax'
import traxExt from '../../trax-ext'

const AddChannel = ({presets, onSelect, onTestSelect}) => (
  <div>
    <strong>Add a channel</strong>
    <ul>
      {presets.map(preset => (
        <li key={preset.id}>
          <a onClick={() => onSelect(preset.id)}>
            {preset.title} ({preset.sample})
          </a>
        </li>
      ))}
      {/*<li><a onClick={() => onTestSelect(presets[0].id, 10)}>Add 10 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect(presets[0].id, 50)}>Add 50 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect(presets[0].id, 100)}>Add 100 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect(presets[0].id, 500)}>Add 500 channels (TEST)</a></li>
      <li><a onClick={() => onTestSelect(presets[0].id, 1000)}>Add 1000 channels (TEST)</a></li>*/}
    </ul>
  </div>
)

AddChannel.propTypes = {
  id: React.PropTypes.string.isRequired,  // The block id
  presets: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  presets: presets.selectors.getAll(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onSelect: (preset) => {
    const channelAction = dispatch(traxExt.actions.createChannel({preset}))
    dispatch(blocks.actions.addChannel(id, channelAction.payload.id))
  },
  onTestSelect: (preset, n=10) => {
    for (let i=0; i < n; i++)
      dispatch(traxExt.actions.createChannel({preset}))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannel)
