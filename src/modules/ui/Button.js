import React from 'react'
import classNames from 'classnames'
import {PureComponent} from 'loopda/lib/react-ext'

class Button extends PureComponent {

  render() {

    const {state, text, className, children, onClick} = this.props

    const cssClass = classNames({
      button: true,
      active: state
    }) + ' ' + className

    let stateText
    if (text)
      stateText = state ? text[1] : text[0]

    return (
      <a className={cssClass} onClick={onClick}>
        {text ? stateText : children}
      </a>
    )

  }

}

Button.propTypes = {
  state: React.PropTypes.bool,
  text: React.PropTypes.array,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

Button.defaultProps = {
  className: ''
}

export default Button
