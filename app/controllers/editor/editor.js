import store from 'globals/store';
import audioService from 'globals/audioservice';

export default {

  addSong(editor, title) {
    let song = store.Song.create({editor, title});
    song.save();
  },

  playSong(sequencer, song) {

    let {data} = song.state;
    let {beats, beatDuration, channels} = sequencer.state;

    let hihat = channels.find(channel => channel.state.sample === 'hihat').state.id;
    let clap = channels.find(channel => channel.state.sample === 'clap').state.id;
    let kick = channels.find(channel => channel.state.sample === 'kick').state.id;

    // // <TESTING> Test data
    // data = [
    //   [hihat, clap],
    //   [kick],
    //   // [kick],
    //   // [clap, kick]
    // ];

    // Queues up every blip in the song to play with the proper timing offset
    data.forEach((line, i) => {
      line.forEach((channelId) => {
        if (!channelId)
          return;
        let channel = channels.find(channel => channel.state.id === channelId);
        channel.state.blips.forEach((blip, beat) => {
          audioService.playBlip(blip.getPlayState({
            offset: (beatDuration * beats * i) + (beatDuration * beat)
          }));
        });
      });
    });

  }

};
