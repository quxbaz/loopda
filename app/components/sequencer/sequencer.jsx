import React from 'react';
import watchMixin from 'components/mixins/watch';

export default React.createClass({

  mixins: [watchMixin],

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
      <div className="sequencer">
        {this.renderChildren()}
      </div>
    );
  }

});
