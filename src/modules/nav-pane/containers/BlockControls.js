import React from 'react'
import {connect} from 'react-redux'

const NavPaneBlockControls = () => (
  <div className="nav-pane-block-controls">
    controls
  </div>
)

NavPaneBlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch, {id}) => ({

})

export default connect(
  null,
  mapDispatchToProps
)(NavPaneBlockControls)
