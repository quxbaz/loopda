import React from 'react'
import ChannelList from './ChannelList'
import SongGrid from './SongGrid'

const EditorPanel = ({id}) => (
  <div className="editor-panel">
    <ChannelList />
    <SongGrid />
  </div>
)

EditorPanel.propTypes = {
  id: React.PropTypes.string,
}

export default EditorPanel
