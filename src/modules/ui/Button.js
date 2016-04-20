import React from 'react'
import classNames from 'classnames'

const Button = ({state, text, className, children, onClick}) => {

  const cssClass = classNames({
    button: true,
    active: state
  }) + ' ' + (className || '')

  let stateText
  if (text)
    stateText = state ? text[1] : text[0]

  return (
    <a className={cssClass} onClick={onClick}>
      {text ? stateText : children}
    </a>
  )

}

Button.propTypes = {
  state: React.PropTypes.bool,
  text: React.PropTypes.array,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default Button
