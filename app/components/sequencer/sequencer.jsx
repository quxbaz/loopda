import React from 'react';
import watcher from 'globals/watcher';

export default React.createClass({

  componentDidMount() {
    watcher.on('change', () => {
      this.forceUpdate();
    });
  },

  propTypes: {
    sequencer: React.PropTypes.object.isRequired
  },

  renderChildren() {
    return React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {sequencer: this.props.sequencer})
    );
  },

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    );
  }

});
