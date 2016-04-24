import React from 'react'
import classNames from 'classnames'
import constants from 'loopda/src/globals/style-constants'
import {PureComponent} from 'loopda/lib/react-ext'

class Blip extends PureComponent {

  render() {

    const {blip} = this.props
    const {mute, beat, color} = blip

    const cssClass = classNames({
      blip: true,
      clicky: true,
      enabled: !mute,
    })

    const style = {
      left: beat * constants.blipWidth,
      background: color
    }

    return <div className={cssClass} style={style} />

  }

}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired
}

export default Blip
