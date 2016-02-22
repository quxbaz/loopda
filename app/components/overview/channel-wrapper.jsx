import React from 'react';
import classNames from 'classnames';
import store from 'globals/store';
import sequencerCtrl from 'controllers/sequencer/sequencer';
import channelCtrl from 'controllers/sequencer/channel';
import blipCtrl from 'controllers/sequencer/blip';
import ChannelComponent from 'components/sequencer/channel';

ChannelWrapper.propTypes = {
  channel: React.PropTypes.object.isRequired,
  currentBeat: React.PropTypes.number.isRequired,
  onRemove: React.PropTypes.func
};

export default function ChannelWrapper(props) {
  let {channel} = props;
  let record = store.recordFor(channel);
  // Event handlers
  let remove = props.onRemove.bind(null, channel);
  let viewChannelDetail = channelCtrl.viewChannelDetail.bind(null, channel);
  let toggleMute = channelCtrl.toggleMute.bind(null, channel);
  let classes = classNames({
    channel: true,
    mute: channel.state.mute
  });
  return (
    <div className={classes}>
      <div className="channel-title">
        <div>
          <a onClick={viewChannelDetail}>{record.state.title}</a>
        </div>
        {channel.state.sampleName} -
        (<a onClick={remove}>remove</a>) -
        (<a onClick={toggleMute}>
          {channel.state.mute ? 'unmute' : 'mute'}
        </a>)
      </div>
      <div className="inner-channel">
        <ChannelComponent channel={channel} currentBeat={props.currentBeat}
                          onClickBlip={blipCtrl.toggleMute} />
      </div>
    </div>
  );
};
