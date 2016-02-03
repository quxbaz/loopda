import React from 'react';
import classNames from 'classnames';
import modelUpdate from 'components/mixins/modelupdate';
import helper from 'helpers/channel';

export default React.createClass({

  mixins: [modelUpdate],

  remove() {
    this.props.onRemove(this.props.model);
  },

  toggleMute() {
    let {model} = this.props;
    model.setState({mute: !model.state.mute});
  },

  render() {
    let {model} = this.props;
    let classes = classNames({
      channel: true,
      mute: model.state.mute
    });
    return (
      <div className={classes}>
        <div className="channel-title">
          {model.state.sampleName} -
          (<a onClick={this.remove}>remove</a>) -
          (<a onClick={this.toggleMute}>
            {model.state.mute ? 'unmute' : 'mute'}
          </a>)
        </div>
        <div className="inner-channel">
          <div className="blips-container">
            {helper.renderBlips(this)}
          </div>
        </div>
      </div>
    );
  }

});
