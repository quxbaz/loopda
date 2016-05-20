import React from 'react'
import {connect} from 'react-redux'

const NavPaneBlockControls = () => (
  <div className="nav-pane-block-controls">
    Controls
  </div>
)

NavPaneBlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
}

const mapDispatchToProps = () => ({

})

export default connect(
  null,
  mapDispatchToProps
)(NavPaneBlockControls)
