import React from 'react'
import Blip from './Blip'

const Channel = ({channel, blips}) => (
  <div className="channel">
    {blips.map(blip =>
      <Blip key={blip.id} blip={blip} />
    )}
  </div>
)

Channel.defaultProps = {
  channel: React.PropTypes.object.isRequired,
  blips: React.PropTypes.array.isRequired
}

export default Channel
