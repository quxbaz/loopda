import React from 'react';
import {times} from 'lib/util';

TempoBar.propTypes = {
  beat: React.PropTypes.number.isRequired
};

export default function TempoBar(props) {
  let blipWidth = 48;
  let offset = blipWidth * props.beat;
  let style = {left: offset + 'px'};
  return (
    <div className="tempo-bar">
      <div className="tempo-line" style={style} />
    </div>
  );
}
