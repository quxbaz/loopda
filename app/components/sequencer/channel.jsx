import React from 'react';
import classNames from 'classnames';
import modelUpdate from 'components/mixins/modelupdate';
import helper from 'helpers/channel';
import dispatcher from 'app/dispatcher';
import channelActions from 'actions/sequencer/channel';

export default React.createClass({

  mixins: [modelUpdate],

  remove() {
    this.props.onRemove(this.props.model);
  },

  viewChannelDetail() {
    dispatcher.emit(channelActions.viewChannelDetail, this.props.model);
  },

  toggleMute() {
    let {model} = this.props;
    model.setState({mute: !model.state.mute});
  },

  render() {
    let {model, record} = this.props;
    let classes = classNames({
      channel: true,
      mute: model.state.mute
    });
    return (
      <div className={classes}>
        <div className="channel-title">
          <div>
            <a onClick={this.viewChannelDetail}>{record.state.title}</a>
          </div>
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
