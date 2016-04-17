import React from 'react';
import SequencerCtrl from 'controllers/sequencer/sequencer';

export default React.createClass({

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

  render() {
    return (
      <div className="sequencer">
        {this.props.children}
      </div>
    );
  }

});
