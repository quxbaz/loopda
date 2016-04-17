import React from 'react'
import trax from '../../trax'

// import Icon from 'components/ui/icon'
// import Button from 'components/ui/button'

// const Controls = ({channel}) => {
//   <div className="channel-controls">
//     <div className="color-box" style={{background: color}} />
//     <div className="channel-text">
//       <div className="channel-number hide">{number}</div>
//       <div className="channel-title clicky" onClick={viewPreset}>{title} ({number})</div>
//       <a className="archive-channel" onClick={archiveChannel}><Icon name="x" /></a>
//     </div>
//     <div className="channel-controls">
//       <Button className="solo-button" state={solo} onClick={toggleSolo}>Solo</Button>
//       <Button state={mute} onClick={toggleMute}>Mute</Button>
//     </div>
//   </div>
// }

// Controls.propTypes = {
//   channel: React.PropTypes.object.isRequired
// }

const ChannelBlock = ({channel}) => {

  return (
    <div className="channel-block">
      {/*<Controls channel={channel} />*/}
      <trax.components.Channel channel={channel} />
    </div>
  )

}

ChannelBlock.propTypes = {
  channel: React.PropTypes.object.isRequired
}

export default ChannelBlock
