import React from 'react';
import classNames from 'classnames';
import store from 'globals/store';
import BlipCom from './blip';

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
  onClickBlip: React.PropTypes.func
};

export default function Channel(props) {

  let {blips, mute} = props.channel.state;
  let record = store.recordFor(props.channel);

  let blipComs = blips.map((blip) =>
    React.createElement(BlipCom, {
      key: blip.id,
      blip,
      color: record.state.color,
      onClick: props.onClickBlip
    })
  );

  let classes = classNames({
    channel: true,
    enabled: !mute,
    mute: mute
  });

  return <div className={classes}>{blipComs}</div>;
};
