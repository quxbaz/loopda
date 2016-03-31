import store from 'globals/store';
import {clone, repeat} from 'lib/util';

export default {

  addLine(song) {
    song.setState({
      data: [...song.state.data, repeat(null, song.state.maxChannels)]
    });
  },

  // // <TODO> Should take a song/position
  // setChannel(channel) {
  //   /*
  //     Sets a channel at a position.
  //   */
  //   let editor = store.Editor.one(true);
  //   if (!editor.state.currentSong)
  //     return;
  //   let song = editor.take('currentSong');
  //   let data = clone(song.state.data);
  //   let pos = song.state.position;
  //   data[pos[1]][pos[0]] = channel.cid;
  //   song.setState({data});
  // },

  // // <TODO> Should take a song/position
  // clearChannel() {
  //   /*
  //     Clears a channel at a position.
  //   */
  //   let editor = store.Editor.one(true);
  //   if (!editor.state.currentSong)
  //     return;
  //   let song = editor.take('currentSong');
  //   let data = clone(song.state.data);
  //   let pos = song.state.position;
  //   data[pos[1]][pos[0]] = null;
  //   song.setState({data});
  // }

};
