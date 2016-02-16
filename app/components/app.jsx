/*
  App component
*/

import React from 'react';
import {router} from 'app/router';

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
