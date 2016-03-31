import React from 'react';
import {route} from 'globals/router';
import store from 'globals/store';
import Editor from 'components/editor/editor';

route('/editor', {
  resource() {
    return store.Editor.one();
  },
  setup(editor) {
    editor.setState({currentSong: undefined});
    return editor;
  },
  render(editor) {
    return <Editor editor={editor} />;
  }
});
