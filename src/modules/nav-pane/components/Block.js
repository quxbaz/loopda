import React from 'react'
import traxExt from '../../trax-ext'
import {PureComponent} from 'loopda/lib/react-ext'

class NavPaneBlock extends PureComponent {
  render() {
    return (
      <div className="nav-pane-block">
        <traxExt.providers.Block {...this.props} />
        <div className="block-label">{this.props.i + 1}</div>
      </div>
    )
  }
}

export default NavPaneBlock
