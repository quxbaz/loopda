import React from 'react'
import {connect} from 'react-redux'
import {channels, songs} from 'trax'
import traxExt from '../../trax-ext'

const ChannelList = ({channels, onClickEmpty, onClickChannel}) => (
  <div className="editor-channel-list">
    <a onClick={onClickEmpty}>Empty</a>
    {channels.map(channel =>
      <traxExt.components.Channel key={channel.id} channel={channel}
       onClick={onClickChannel} />
    )}
  </div>
)

ChannelList.propTypes = {
  id: React.PropTypes.string.isRequired,
  channels: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state),
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickEmpty: () => {
    dispatch(
      songs.actions.emptyCell(id)
    )
  },
  onClickChannel: (channel) => {
    dispatch(
      songs.actions.setCell(id, channel.id)
    )
    // <TODO>
    // Move cursor down
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)
