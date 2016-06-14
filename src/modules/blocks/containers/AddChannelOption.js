import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import traxExt from '../../trax-ext'
import {blocks} from 'trax'

class AddChannelOption extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.preset.id)
  }

  render() {
    const {id, title, sample} = this.props.preset
    return (
      <li key={id} onClick={this.handleClick}>
        <a>{title} ({sample})</a>
      </li>
    )
  }
}

AddChannelOption.propTypes = {
  preset: PropTypes.object.isRequired,
  block: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch, {block}) => ({
  onClick(preset) {
    const action = dispatch(traxExt.actions.createChannel({preset}))
    dispatch(blocks.actions.addChannel(block, action.payload.id))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(AddChannelOption)
