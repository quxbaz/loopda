import React from 'react'
import traxExt from '../../trax-ext'
import ui from '../../ui'
import BlockControls from '../containers/BlockControls'

// <TODO>

const NavPaneBlock = (props) => (
  <div className="nav-pane-block">
    <div className="block-position-label">{props.i + 1}</div>
    <traxExt.components.Block {...props} />
    {/*<ui.components.ToggleMenu>*/}
      <BlockControls id={props.block.id} />
    {/*</ui.components.ToggleMenu>*/}
  </div>
)

export default NavPaneBlock
