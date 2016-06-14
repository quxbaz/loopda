import React, {Component} from 'react'

class KeyWatcher extends Component {

  constructor(props) {
    super(props)
    this.handleKey = this.handleKey.bind(this)
  }

  handleKey(event) {
    const {props} = this
    if (props.keyCode) {
      if (event.keyCode === props.keyCode)
        props.handler(event)
    } else {
      switch (event.keyCode) {
        case 27:
          if (props.onKeyEscape) {
            event.preventDefault()
            props.onKeyEscape(event)
          }
          break
        case 32:
          if (props.onKeySpace) {
            event.preventDefault()
            props.onKeySpace(event)
          }
          break
        case 39:
          if (props.onKeyRightArrow) {
            event.preventDefault()
            props.onKeyRightArrow(event)
          }
          break
        case 37:
          if (props.onKeyLeftArrow) {
            event.preventDefault()
            props.onKeyLeftArrow(event)
          }
          break
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey)
  }

  render() {return null}

  // // Is this necessary to implement?
  // willReceiveProps(nextProps) {
  //   // remove event listener
  // }

}

KeyWatcher.propTypes = {
  keyCode: React.PropTypes.number,
  handler: React.PropTypes.func,
  onKeyEscape: React.PropTypes.func,
  onKeySpace: React.PropTypes.func,
  onKeyRightArrow: React.PropTypes.func,
  onKeyLeftArrow: React.PropTypes.func,
}

export default KeyWatcher
