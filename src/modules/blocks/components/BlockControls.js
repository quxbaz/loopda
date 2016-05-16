import React from 'react'

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
    const {isLastBlock} = this.props
    return (
      <div className="block-controls">
        <button onClick={this.handleClickPrev}>Prev</button>
        <button onClick={this.handleClickNext}>{isLastBlock ? 'Add' : 'Next'} block</button>
        <button onClick={this.handleClickRemove}>Remove block</button>
      </div>
    )
  }

}

BlockControls.propTypes = {
  id: React.PropTypes.string.isRequired,
  isLastBlock: React.PropTypes.bool,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired,
}

BlockControls.defaultProps = {
  isLastBlock: false,
}

export default BlockControls
