import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import Blip from '../containers/Blip'

class Channel extends PureComponent {

  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown(event) {
    this.props.onMouseDown(event, this.refs.div)
  }

  render() {
    const {channel, onMouseDown} = this.props
    return (
      <div ref="div" className="channel" onMouseDown={this.handleMouseDown}>
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
  channel: React.PropTypes.object.isRequired,
  onMouseDown: React.PropTypes.func
}

export default Channel
