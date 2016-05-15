import React from 'react'

// <TODO> Move to component

class BlockControls extends React.Component {

  constructor(props) {
    super(props)
    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }

  handleClickPrev() {
    this.props.onClickPrev(this.props.id)
  }

  handleClickNext() {
    this.props.onClickNext(this.props.id)
  }

  handleClickRemove() {
    this.props.onClickRemove(this.props.id)
  }

  render() {
    return (
      <div className="block-controls">
        <button onClick={this.handleClickPrev}>Prev</button>
        <button onClick={this.handleClickNext}>Next block</button>
        <button onClick={this.handleClickRemove}>Remove block</button>
      </div>
    )
  }

}

BlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}

export default BlockControls
