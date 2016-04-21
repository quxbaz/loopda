import React from 'react'
import Blip from '../containers/Blip'

// const Channel = ({channel}) => (
//   <div className="channel">
//     {channel.blips.map(id =>
//       <Blip key={id} id={id} />
//     )}
//   </div>
// )

const Channel = ({channel}) => {
  console.log('render:', channel.number)
  return (
    <div className="channel">
      {channel.blips.map(id =>
        <Blip key={id} id={id} />
      )}
    </div>
  )
}

Channel.defaultProps = {
  channel: React.PropTypes.object.isRequired
}

export default Channel
