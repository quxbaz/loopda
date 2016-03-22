import store from 'globals/store';

export default {

  addSong(editor, title) {
    let song = store.Song.create({editor, title});
    song.save();
  }

};
