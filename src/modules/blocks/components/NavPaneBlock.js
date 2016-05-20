import React from 'react'
import traxExt from '../../trax-ext'
import NavPaneBlockControls from '../containers/NavPaneBlockControls'

const NavPaneBlock = (props) => (
  <div className="nav-pane-block">
    <div className="block-position-label">{props.i + 1}</div>
    <traxExt.components.Block {...props} />
    <NavPaneBlockControls id={props.block.id} />
  </div>
)

export default NavPaneBlock
