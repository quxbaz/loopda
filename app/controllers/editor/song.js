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
    console.log('clicked slot:', song.state.position);
  },

  setChannel(channel) {
    let editor = store.Editor.all(true)[0];
    if (!editor.state.currentSong)
      return;
    let song = editor.take('currentSong');
    let data = clone(song.state.data);
    let pos = song.state.position;
    data[pos[1]][pos[0]] = channel.state.id;
    song.setState({data});
  }

};
