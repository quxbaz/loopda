import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import ChannelItem from './ChannelItem'

class ChannelList extends PureComponent {
  render() {
    const {ids, isSoloMode} = this.props
    return (
      <div className="channel-list">
        {ids.map((id) => (
          <ChannelItem key={id} id={id} isSoloMode={isSoloMode} />
        ))}
      </div>
    )
  }
}

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

const mapStateToProps = (state, {ids}) => {
  const query = channels.selectors.getMany(ids)(state)
  return {
    ids,
    isSoloMode: query.some(c => c.solo),
  }
}

export default connect(
  mapStateToProps
)(ChannelList)
