import React from 'react'
import classNames from 'classnames'

const Blip = ({blip, onClick}) => {

  let {id, mute, color} = blip

  const cssClass = classNames({
    blip: true,
    clicky: true,
    enabled: !mute,
  })

  const handleClick = () => onClick(id)

  return <div className={cssClass} style={{background: !mute && color}}
              onMouseDown={handleClick} />

}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
}

export default Blip
