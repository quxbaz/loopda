import React from 'react'
import Channel from '../containers/Channel'

const ChannelList = ({ids, isSoloMode}) => (
  <div className="channel-list">
    {ids.map(id =>
      <Channel key={id} id={id} isSoloMode={isSoloMode} />
    )}
  </div>
)

ChannelList.propTypes = {
  ids: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool,
}

ChannelList.defaultProps = {
  isSoloMode: false,
}

export default ChannelList
