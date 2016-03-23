import React from 'react';

export default React.createClass({

  propTypes: {
    song: React.PropTypes.object.isRequired
  },

  render() {
    let {song} = this.props;
    return (
      <div>{song.state.title}</div>
    );
  }

});
