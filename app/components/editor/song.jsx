import React from 'react';
import SongCtrl from 'controllers/editor/song';

/*
  Line component
*/

Line.propTypes = {
  line: React.PropTypes.array.isRequired,
  row: React.PropTypes.number.isRequired,
  onClickSlot: React.PropTypes.func
};

function Line(props) {
  let {line, row, onClickSlot} = props;
  let slots = line.map(
    (channelId, i) => <Slot key={i} position={[i, row]} channelId={channelId} onClick={onClickSlot} />
  );
  return <div className="line">{slots}</div>;
}


/*
  Slot component
*/

Slot.propTypes = {
  position: React.PropTypes.array.isRequired,
  channelId(props, propName) {
    let prop = props[propName];
    if (typeof prop !== 'string' && prop !== null)
      throw new Error('@channelId must be an id or null.');
  },
  onClick: React.PropTypes.func
};

function Slot(props) {
  let id = props.channelId;
  let onClick = () => props.onClick(props.position);
  return <div className="slot" onClick={onClick}>{id ? 'x' : '-'}</div>;
}


/*
  AddNewLine component
*/

AddNewLine.propTypes = {
  onClick: React.PropTypes.func
};

function AddNewLine(props) {
  return (
    <div>
      <a onClick={props.onClick}>Add Line</a>
    </div>
  );
}


/*
  Song component
*/

export default React.createClass({

  propTypes: {
    song: React.PropTypes.object.isRequired
  },

  handleClickSlot(position) {
    SongCtrl.setPosition(this.props.song, position);
  },

  addNewLine() {
    SongCtrl.addLine(this.props.song);
  },

  render() {
    let {song} = this.props;
    let lines = song.state.data.map((line, i) => {
      return <Line key={i} row={i} line={line} onClickSlot={this.handleClickSlot} />;
    });

    return (
      <div className="song">
        <h4>{song.state.title}</h4>
        <div className="song-grid">
          {lines}
          <AddNewLine onClick={this.addNewLine} />
        </div>
      </div>
    );
  }

});
