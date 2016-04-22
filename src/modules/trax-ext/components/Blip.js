import React from 'react'
import classNames from 'classnames'
import {PureComponent} from 'loopda/lib/react-ext'

class Blip extends PureComponent {

  render() {

    const {blip, onClick} = this.props
    const {mute, color} = blip

    const cssClass = classNames({
      blip: true,
      clicky: true,
      enabled: !mute,
    })

    return <div className={cssClass} style={{background: !mute && color}}
                onMouseDown={onClick} />

  }

}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
}

export default Blip
