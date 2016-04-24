import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import Blip from '../containers/Blip'

class Channel extends PureComponent {
  render() {
    const {channel} = this.props
    return (
      <div className="channel">
        {channel.blips.map((id, i) => {
          if (id === undefined)
            return null
          return <Blip key={i} id={id} />
        })}
      </div>
    )
  }
}

Channel.defaultProps = {
  channel: React.PropTypes.object.isRequired
}

export default Channel
