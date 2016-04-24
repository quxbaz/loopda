import React from 'react'
import {connect} from 'react-redux'
import ui from '../../ui'
import {PureComponent} from 'loopda/lib/react-ext'

class Pager extends PureComponent {

  render() {
    const {pager, onClickPrev, onClickNext} = this.props
    const start = pager.current * pager.size
    const end = start + pager.size
    return (
      <div>
        <button disabled={pager.current <= 0} onClick={onClickPrev}>Prev page</button>{' '}
        {start + 1} - {end + ' '}
        <button onClick={onClickNext}>Next page</button>
      </div>
    )
  }

}

Pager.propTypes = {
  pager: React.PropTypes.object.isRequired,
  onClickPrev: React.PropTypes.func.isRequired,
  onClickNext: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  pager: ui.selectors.getPager(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClickPrev: () => {
    dispatch(ui.actions.prevPage())
  },
  onClickNext: () => {
    dispatch(ui.actions.nextPage())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pager)
