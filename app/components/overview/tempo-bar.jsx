import React from 'react';

TempoBar.propTypes = {
  beat: React.PropTypes.number.isRequired
};

export default function TempoBar(props) {
  let blipWidth = 48;
  let offset = blipWidth * props.beat;
  let style = {left: offset + 'px'};
  return (
    <div className="tempo-bar">
      <div className="actual-bar">
        <div className="tempo-mark" style={style} />
      </div>
    </div>
  );
}
