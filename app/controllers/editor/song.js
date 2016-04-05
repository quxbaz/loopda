import {clone, repeat} from 'lib/util';

export default {

  addLine(song) {
    song.setState({
      data: [...song.state.data, repeat(null, song.state.maxChannels)]
    });
  },

  setChannel(song, channel, position) {
    /*
      Sets a channel at a position.
    */
    let [x, y] = position;
    let data = clone(song.state.data);
    data[y][x] = channel.state.id;
    song.setState({data});
  },

  clearChannel(song, position) {
    /*
      Clears a channel at a position.
    */
    let [x, y] = position;
    let data = clone(song.state.data);
    data[y][x] = null;
    song.setState({data});
  }

};
