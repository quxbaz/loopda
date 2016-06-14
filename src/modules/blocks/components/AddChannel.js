import React, {Component, PropTypes} from 'react'
import AddChannelOption from '../providers/AddChannelOption'

class AddChannel extends Component {
  render() {
    const {ids, block} = this.props
    return (
      <div>
        <strong>Add a channel</strong>
        <ul>
          {ids.map((id) => (
            <AddChannelOption key={id} id={id} block={block} />
          ))}
        </ul>
      </div>
    )
  }
}

AddChannel.propTypes = {
  ids: PropTypes.array.isRequired,
  block: PropTypes.string.isRequired,
}

export default AddChannel
