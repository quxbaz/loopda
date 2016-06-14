import React, {PropTypes} from 'react'
import values from 'qux/lib/values'
import {PureComponent} from 'loopda/lib/react-ext'
import AddChannelOption from '../containers/AddChannelOption'

class AddChannel extends PureComponent {
  render() {
    const {presets, block} = this.props
    return (
      <div>
        <strong>Add a channel</strong>
        <ul>
          {values(presets).map((preset) => (
            <AddChannelOption key={preset.id} preset={preset} block={block} />
          ))}
        </ul>
      </div>
    )
  }
}

AddChannel.propTypes = {
  presets: PropTypes.object.isRequired,
  block: PropTypes.string.isRequired,
}

export default AddChannel
