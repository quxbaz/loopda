import React from 'react';
import classNames from 'classnames';
import store from 'globals/store';
import SequencerCtrl from 'controllers/sequencer/sequencer';
import ChannelCtrl from 'controllers/sequencer/channel';
import BlipCtrl from 'controllers/sequencer/blip';
import ChannelCom from 'components/sequencer/channel';

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
  let viewChannelDetail = ChannelCtrl.viewChannelDetail.bind(null, channel);
  let toggleMute = ChannelCtrl.toggleMute.bind(null, channel);
  let classes = classNames({
    'channel-wrapper': true,
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
        <ChannelCom channel={channel} currentBeat={props.currentBeat}
                    onClickBlip={BlipCtrl.toggleMute} />
      </div>
    </div>
  );
};
