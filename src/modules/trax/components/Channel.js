import React from 'react'
import Blip from './Blip'

const Channel = ({channel}) => {

  const {blips} = channel

  return (
    <div className="channel">
      {blips.map(blip =>
        <Blip key={blip.id} blip={blip} />
      )}
    </div>
  )

}


Channel.defaultProps = {
  channel: React.PropTypes.object.isRequired
}

export default Channel
