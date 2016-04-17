import React from 'react';
import {times} from 'lib/util';
import styleConstants from 'globals/style-constants';

TempoBar.propTypes = {
  beat: React.PropTypes.number.isRequired
};

export default function TempoBar(props) {
  let offset = styleConstants.blipWidth * props.beat;
  let style = {left: offset + 'px'};
  return (
    <div className="tempo-bar">
      <div className="tempo-line" style={style} />
    </div>
  );
}
