import React from 'react'
import classNames from 'classnames'
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

    const {blip, width} = this.props
    const {mute, beat, color} = blip

    const cssClass = classNames({
      blip: true,
      clicky: true,
      enabled: !mute,
    })

    const style = {
      background: color,
      left: beat * width,
    }

    return <div className={cssClass} style={style} onClick={this.handleClick} />

  }

}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func,
}

Blip.defaultProps = {
  onClick: () => {},
}

export default Blip
