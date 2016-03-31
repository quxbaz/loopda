import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import Editor from 'components/editor/editor';

route('/editor/:id', {
  resource(id) {
    return Promise.all([
      store.Editor.one(),
      id
    ]);
  },
  setup([editor, id]) {
    let currentSong = editor.take('songs').find(song => song.state.id === id);
    editor.setState({currentSong});
    return [editor, currentSong];
  },
  render([editor, currentSong]) {
    return <Editor sequencer={app.sequencer} editor={editor} currentSong={currentSong} />
  }
});
