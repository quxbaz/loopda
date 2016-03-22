import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import Sequencer from 'components/sequencer/sequencer';
import Overview from 'components/overview/overview';
import Editor from 'components/editor/editor';

route('/sequencer/editor', {
  resource() {
    return store.all(['preset', 'editor']).then(([presets, editors]) => {
      return [app.sequencer, presets, editors[0]]
    });
  },
  render([sequencer, presets, editor]) {
    return (
      <Sequencer sequencer={sequencer}>
        <Overview presets={presets} />
        <Editor editor={editor} />
      </Sequencer>
    );
  }
});
