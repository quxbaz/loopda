import React from 'react'

class KeyWatcher extends React.Component {

  constructor(props) {
    super(props)
    this.handleKey = this.handleKey.bind(this)
  }

  handleKey(event) {
    const {props} = this
    switch (event.keyCode) {
      case 27:
        props.onKeyEscape && props.onKeyEscape(event)
        break
      case 32:
        props.onKeySpace && props.onKeySpace(event)
        break
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  render() {return null}

  // // Is this necessary to implement?
  // willReceiveProps(nextProps) {
  //   // remove event listener
  // }

}

KeyWatcher.propTypes = {
  onKeyEscape: React.PropTypes.func,
  onKeySpace: React.PropTypes.func
}

export default KeyWatcher
