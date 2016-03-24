import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import Sequencer from 'components/sequencer/sequencer';
import Overview from 'components/overview/overview';
import Editor from 'components/editor/editor';

route('/sequencer/editor/:id', {
  resource(id) {
    return store.all(['preset', 'editor']).then(([presets, editors]) => {
      return [app.sequencer, presets, editors[0], id];
    });
  },
  setup([sequencer, presets, editor, id]) {
    let currentSong = editor.take('songs').find(song => song.state.id === id);
    editor.setState({currentSong});
    return [sequencer, presets, editor, currentSong];
  },
  render([sequencer, presets, editor, currentSong]) {
    return (
      <Sequencer sequencer={sequencer}>
        <Overview presets={presets} songMode={true} />
        <Editor editor={editor} currentSong={currentSong} />
      </Sequencer>
    );
  }
});
