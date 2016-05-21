import React from 'react'
import traxExt from '../../trax-ext'

const NavPaneBlock = (props) => (
  <div className="nav-pane-block">
    <traxExt.components.Block {...props} />
    <div className="block-position-label">{props.i + 1}</div>
  </div>
)

export default NavPaneBlock
