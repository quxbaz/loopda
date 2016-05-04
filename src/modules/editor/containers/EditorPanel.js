import React from 'react'
import ChannelList from './ChannelList'
import Song from './Song'

const EditorPanel = ({id}) => (
  <div className="editor-panel">
    <ChannelList />
    <Song id={id} />
  </div>
)

EditorPanel.propTypes = {
  id: React.PropTypes.string,
}

export default EditorPanel
