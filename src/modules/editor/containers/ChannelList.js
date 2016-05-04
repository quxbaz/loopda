import React from 'react'
import {connect} from 'react-redux'
import {channels} from 'trax'
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
  channels: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  channels: channels.selectors.getAll(state),
})

const mapDispatchToProps = (dispatch) => ({
  onClickEmpty: () => {
    console.log('click empty')
  },
  onClickChannel: (id) => {
    console.log('click channel')
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)
