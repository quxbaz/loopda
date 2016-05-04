import React from 'react'
import {Route} from 'stateful-router'
import AddSong from '../containers/AddSong'
import SongSelect from '../containers/SongSelect'
import Controls from '../containers/Controls'
import EditorPanel from '../containers/EditorPanel'

const Editor = () => (
  <div className="editor">
    <AddSong />
    <Route route="/">
      <SongSelect />
    </Route>
    <Route route=":id">
      <Controls />
      <EditorPanel />
    </Route>
  </div>
)

export default Editor
