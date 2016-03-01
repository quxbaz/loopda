import React from 'react';

MasterChannel.propTypes = {
  beats: React.PropTypes.number.isRequired,
  channels: React.PropTypes.array.isRequired
};

export default function MasterChannel(props) {

  let {beats, channels} = props;

  let blipValues = [];
  let greatest = 0;
  for (let i=0; i < beats; i++) {
    let value = 0;
    channels.forEach((channel) => {
      let blip = channel.state.blips[i];
      if (!blip.state.mute)
        value++;
    });
    if (value > greatest)
      greatest = value;
    blipValues.push(value);
  }

  let backgrounds = blipValues.map((value, i) => {
    let h = 0;
    let s = 0;
    let l = value === 0 ? 100 : (1 - (value / greatest)) * 100;
    return `hsl(${h}, ${s}%, ${l}%)`;
  });

  return (
    <div className="channel master-channel">
      {backgrounds.map((background, i) =>
        <div key={i} className="blip" style={{background}} />
      )}
    </div>
  );

};
