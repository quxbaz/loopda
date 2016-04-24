import React from 'react'
import classNames from 'classnames'

const Icon = ({name, className, onClick}) => {

  const cssClass = classNames({
    icon: true,
    clicky: onClick
  }) + ' ' + (className || '')

  // JSX does not support xlink:href, so we need raw HTML.
  return (
    <span className={cssClass} onClick={onClick}>
      <svg dangerouslySetInnerHTML={{
        __html: `<use xlink:href="icons/sprite.svg#${name}"></use>`
      }}/>
    </span>
  )

}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default Icon
