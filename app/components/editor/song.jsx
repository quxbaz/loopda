import React from 'react';
import SongCtrl from 'controllers/editor/song';

/*
  Line component
*/

Line.propTypes = {
  line: React.PropTypes.array.isRequired
};

function Line(props) {
  let slots = props.line.map(
    (channelId, i) => <Slot key={i} channelId={channelId} />
  );
  return <div>{slots}</div>;
}

/*
  Slot component
*/

Slot.propTypes = {
  onClick: React.PropTypes.func,
  channelId(props, propName) {
    let prop = props[propName];
    if (typeof prop !== 'string' && prop !== null)
      throw new Error('@channelId must be an id or null.');
  }
};

function Slot(props) {
  let id = props.channelId;
  return <span>[{id ? id : ' '}]</span>;
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

  addNewLine() {
    SongCtrl.addLine(this.props.song);
  },

  render() {
    let {song} = this.props;
    let lines = song.state.data.map(
      (line, i) => <Line key={i} line={line} />
    );

    return (
      <div>
        <h4>{song.state.title}</h4>
        <div>
          {lines}
          <AddNewLine onClick={this.addNewLine} />
        </div>
      </div>
    );
  }

});
