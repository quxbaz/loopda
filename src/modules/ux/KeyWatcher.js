import React from 'react'

class KeyWatcher extends React.Component {

  constructor(props) {
    super(props)
    this.handleKey = this.handleKey.bind(this)
  }

  handleKey(event) {
    const {props} = this
    if (event.keyCode === 32 && props.onKeySpace)
      props.onKeySpace()
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  render() {
    return null
  }

  // // Is this necessary to implement?
  // willReceiveProps(nextProps) {
  //   // remove event listener
  // }

}

KeyWatcher.propTypes = {
  onKeySpace: React.PropTypes.func
}

export default KeyWatcher
