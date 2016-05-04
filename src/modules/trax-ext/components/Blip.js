import React from 'react'
import classNames from 'classnames'
import constants from 'loopda/src/globals/style-constants'
import {PureComponent} from 'loopda/lib/react-ext'

class Blip extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.blip)
  }

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
      background: color,
    }

    return <div className={cssClass} style={style} onClick={this.handleClick} />

  }

}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
}

Blip.defaultProps = {
  onClick: () => {},
}

export default Blip
