import React from 'react';
import watchMixin from 'components/mixins/watch';
import SequencerCtrl from 'controllers/sequencer/sequencer';

export default React.createClass({

  mixins: [watchMixin],

  propTypes: {
    sequencer: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    document.addEventListener('keydown', this.handleSpacebar);
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleSpacebar);
  },

  handleSpacebar(event) {
    if (event.keyCode === 32)
      SequencerCtrl.togglePlay(this.props.sequencer)
  },

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (typeof child === 'string')
        return child;
      else
        return React.cloneElement(child, {sequencer: this.props.sequencer});
    });
  },

  render() {
    return (
      <div className="sequencer">
        {this.renderChildren()}
      </div>
    );
  }

});
