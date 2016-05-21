import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

class Popup extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickMask = this.handleClickMask.bind(this)
  }

  handleClickMask(event) {
    event.stopPropagation()
    this.props.onOutsideClick(event)
  }

  render() {
    return (
      <div className="popup">
        <div className="click-mask" onClick={this.handleClickMask} />
        <div className="content">{this.props.children}</div>
      </div>
    )
  }

}

Popup.propTypes = {
  onOutsideClick: React.PropTypes.func.isRequired,
}

class NavPaneBlockControls extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.state = {open: false}
  }

  handleClick(event) {
    this.setState({open: true})
  }

  handleOutsideClick(event) {
    this.setState({open: false})
  }

  render() {
    const {open} = this.state
    const cssClass = classNames({
      'nav-pane-block-controls': true,
      open,
    })
    return (
      <div ref="el" className={cssClass} onClick={this.handleClick}>
        {!open ? '...' :
          <Popup onOutsideClick={this.handleOutsideClick}>
            popup
          </Popup>}
      </div>
    )
  }

}


NavPaneBlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
}

const mapDispatchToProps = () => ({

})

export default connect(
  null,
  mapDispatchToProps
)(NavPaneBlockControls)
