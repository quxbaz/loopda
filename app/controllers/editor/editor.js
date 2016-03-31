import {router} from 'globals/router';
import store from 'globals/store';
import audioService from 'globals/audioservice';

export default {

  viewEditor() {
    router.nav('/editor');
  },

  viewLastSong() {
    let editor = store.Editor.one(true);
    let {currentSong} = editor.state;
    if (currentSong)
      router.nav('/editor/' + currentSong);
    else
      router.nav('/editor');
  },

  addSong(editor, title) {
    let song = store.Song.create({editor, title});
    song.save();
  },

  // <TODO> Move this to song controller
  playSong(sequencer, song) {

    let {data} = song.state;
    let {beats, beatDuration, channels} = sequencer.state;

    // // <TESTING> Test data
    // let hihat = channels.find(channel => channel.state.sample === 'hihat').state.id;
    // let clap = channels.find(channel => channel.state.sample === 'clap').state.id;
    // let kick = channels.find(channel => channel.state.sample === 'kick').state.id;
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
        let channel = channels.find(channel => channel.hasId(channelId));
        channel.state.blips.forEach((blip, beat) => {
          audioService.playBlip(blip.getPlayState({
            offset: (beatDuration * beats * i) + (beatDuration * beat)
          }));
        });
      });
    });

  },

  changeSong(editor, song) {
    router.nav('/editor/' + song.state.id);
  }

};
