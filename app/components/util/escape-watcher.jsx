/*
  Component that watches for the escape key. This exists because
  stateless components cannot have lifecycle methods.
*/

import React from 'react';

export default React.createClass({

  propTypes: {
    onEscape: React.PropTypes.func.isRequired
  },

  _handleEscKey(event) {
    if (event.keyCode === 27)
      this.props.onEscape(event);
  },

  componentDidMount() {
    window.addEventListener('keydown', this._handleEscKey);
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleEscKey);
  },

  render() {
    return <div className="escape-watcher hide"></div>;
  }

});
