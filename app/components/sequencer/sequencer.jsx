import React from 'react';
import bindTo from 'components/mixins/bindto';

export default React.createClass({

  propTypes: {
    sequencer: React.PropTypes.object.isRequired
  },

  mixins: [bindTo],

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
