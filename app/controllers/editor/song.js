import store from 'globals/store';
import {clone} from 'lib/util';

export default {

  addLine(song) {
    let line = [];
    for (let i=0; i < song.state.maxChannels; i++)
      line.push(null);
    song.setState({
      data: [...song.state.data,  line]
    });
  },

  setPosition(song, position) {
    song.setState({position});
  },

  setChannel(channel) {
    /*
      Sets a channel at a position.
    */
    let editor = store.Editor.one(true);
    if (!editor.state.currentSong)
      return;
    let song = editor.take('currentSong');
    let data = clone(song.state.data);
    let pos = song.state.position;
    data[pos[1]][pos[0]] = channel.cid;
    song.setState({data});
  },

  clearChannel() {
    /*
      Clears a channel at a position.
    */
    let editor = store.Editor.one(true);
    if (!editor.state.currentSong)
      return;
    let song = editor.take('currentSong');
    let data = clone(song.state.data);
    let pos = song.state.position;
    data[pos[1]][pos[0]] = null;
    song.setState({data});
  },

  moveCursorNextSlot(song) {
    if (!song)
      return;
    let position = [...song.state.position];
    let lastIndexY = song.state.data.length - 1;
    let lastIndexX = song.state.data[position[1]].length - 1;
    if (position[0] < lastIndexX)
      position[0]++;
    else if (position[1] < lastIndexY) {
      position[0] = 0;
      position[1]++;
    }
    song.setState({position});
  },

  moveCursorPrevSlot(song) {
    if (!song)
      return;
    let position = [...song.state.position];
    if (position[0] > 0)
      position[0]--;
    else if (position[1] > 0) {
      position[1]--;
      position[0] = song.state.data[position[1]].length - 1;
    }
    song.setState({position});
  },

  moveCursorNextRow(song) {
    if (!song)
      return;
    let position = [...song.state.position];
    let lastIndexY = song.state.data.length - 1;
    position[1] = Math.min(position[1] + 1, lastIndexY);
    song.setState({position});
  },

  moveCursorPrevRow(song) {
    if (!song)
      return;
    let position = [...song.state.position];
    position[1] = Math.max(position[1] - 1, 0);
    song.setState({position});
  }

};
