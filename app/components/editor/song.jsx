import React from 'react';
import classNames from 'classnames';
import store from 'globals/store';
import SongCtrl from 'controllers/editor/song';
import ChannelMenu from './channel-menu';

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
  let slots = line.map((channelId, i) => {
    return <Slot key={i} position={[i, row]} channelId={channelId}
                 onClick={onClickSlot} />
  });
  return <div className="line">{slots}</div>;
}


/*
  Slot component
*/

const Slot = React.createClass({
  propTypes: {
    position: React.PropTypes.array.isRequired,
    channelId(props, propName) {
      let prop = props[propName];
      if (typeof prop !== 'string' && prop !== null)
        throw new Error('@channelId must be an id or null.');
    },
    onClick: React.PropTypes.func
  },
  render() {
    let {position, channelId} = this.props;
    let style = {};
    if (channelId) {
      var channel = store.Channel.get(channelId, true);
      style = {background: channel.state.color};
    }
    let onClick = () => {
      let el = this.refs.slot;
      this.props.onClick(position, [el.offsetLeft, el.offsetTop]);
    };
    return (
      <div ref="slot" className="slot" style={style} onClick={onClick}>
        {channelId ? channel.state.sample + ' (' + channel.state.number + ')' : '-'}
      </div>
    );
  }
});


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
    song: React.PropTypes.object.isRequired,
    channels: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      menuPosition: undefined
    };
  },

  handleClickSlot(position, xy) {
    this.setState({
      menuPosition: position,
      menuDomOffset: xy
    });
  },

  addNewLine() {
    SongCtrl.addLine(this.props.song);
  },

  renderMenu() {
    let {song} = this.props;
    let {menuPosition} = this.state;
    let handleSelect = (channel) => {
      SongCtrl.setChannel(song, channel, menuPosition);
      this.setState({menuPosition: undefined});
    };
    let handleEmpty = () => {
      SongCtrl.clearChannel(song, menuPosition);
      this.setState({menuPosition: undefined});
    };
    return <ChannelMenu channels={this.props.channels} offset={this.state.menuDomOffset}
                        onSelect={handleSelect} onEmpty={handleEmpty} />;
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
          {this.state.menuPosition ? this.renderMenu() : ''}
          {lines}
          <AddNewLine onClick={this.addNewLine} />
        </div>
      </div>
    );
  }

});
