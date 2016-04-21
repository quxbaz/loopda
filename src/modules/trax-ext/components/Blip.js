import React from 'react'
import classNames from 'classnames'

const Blip = ({blip, onClick}) => {

  let {mute, color} = blip

  const cssClass = classNames({
    blip: true,
    clicky: true,
    enabled: !mute,
  })

  return <div className={cssClass} style={{background: !mute && color}}
              onMouseDown={onClick} />

}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
}

export default Blip
