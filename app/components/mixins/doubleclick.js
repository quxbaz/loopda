import ReactDOM from 'react-dom';

export default {

  componentDidMount() {
    this._lastClick = 0;
    ReactDOM.findDOMNode(this).addEventListener('mousedown', this._checkDoubleClick);
  },

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('mousedown', this._checkDoubleClick);
  },

  _checkDoubleClick(event) {
    let time = new Date().getTime();
    if (time - this._lastClick < 500) {
      this._lastClick = 0;
      this.handleDoubleClick(event);
    } else
      this._lastClick = time;
  }

};
