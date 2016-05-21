import React from 'react'
import classNames from 'classnames'

class ToggleMenu extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickMask = this.handleClickMask.bind(this)
    this.state = {open: false}
  }

  handleClick(event) {
    this.setState({open: true})
  }

  handleClickMask(event) {
    event.stopPropagation()  // Prevent bubbling to handleClick
    this.setState({open: false})
  }

  render() {
    const {open} = this.state
    const cssClass = classNames({
      'toggle-menu': true,
      open,
    })
    return (
      <div className={cssClass} onClick={this.handleClick}>
        {open ? <div className="screen-mask" onClick={this.handleClickMask} /> : null}
        {open ? <div className="content">
          {this.props.children}
        </div> : '...'}
      </div>
    )
  }

}

ToggleMenu.propTypes = {
}

export default ToggleMenu
