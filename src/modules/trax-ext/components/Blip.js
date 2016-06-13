import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {PureComponent} from 'loopda/lib/react-ext'

const BEATS = 16

class Blip extends PureComponent {

  render() {

    const {blip} = this.props
    const {mute, beat, color} = blip

    const cssClass = classNames({
      blip: true,
      enabled: !mute,
    })

    const style = {
      background: color,
      left: (100 / BEATS) * beat + '%',
    }

    return <div className={cssClass} style={style} />

  }

}

Blip.propTypes = {
  blip: PropTypes.object.isRequired,
}

export default Blip
