export default {

  addLine(song) {
    let line = [];
    for (let i=0; i < song.state.maxChannels; i++)
      line.push(null);
    song.setState({
      data: [...song.state.data,  line]
    });
  }
};
