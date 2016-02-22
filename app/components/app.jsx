/*
  App component
*/

import React from 'react';
import {router} from 'globals/router';

export default React.createClass({
  componentDidMount() {
    router.on('change', () => {
      this.forceUpdate();
    });
  },
  render() {
    return (
      <div className="app">
        {this.props.router.renderOutlet}
      </div>
    );
  }
});
