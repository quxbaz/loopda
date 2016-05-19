import React from 'react'
import traxExt from '../../trax-ext'

class NavPane extends React.Component {

  render() {
    const {channels, isSoloMode} = this.props
    return (
      <div className="block-nav-pane">
        <traxExt.components.ChannelList channels={channels} isSoloMode={isSoloMode} />
      </div>
    )
  }

}

NavPane.propTypes = {
  channels: React.PropTypes.array.isRequired,
  isSoloMode: React.PropTypes.bool.isRequired,
}

export default NavPane
