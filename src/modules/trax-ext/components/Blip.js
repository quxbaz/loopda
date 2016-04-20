import React from 'react'

const Blip = ({blip}) => {
  return (
    <div className="blip">[{blip.beat}]</div>
  )
}

Blip.propTypes = {
  blip: React.PropTypes.object.isRequired
}

export default Blip
