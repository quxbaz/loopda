import React from 'react'
import ChannelList from '../containers/ChannelList'

class BlockList extends React.Component {

  render() {
    const {blocks} = this.props
    return (
      <div className="block-list">
        {blocks.map(({id, channels}) => (
          <ChannelList key={id} ids={channels} />
        ))}
      </div>
    )
  }

}

BlockList.propTypes = {
  blocks: React.PropTypes.array.isRequired,
}

export default BlockList
