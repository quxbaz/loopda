import React from 'react'
import {connect} from 'react-redux'

const Saver = ({onClickSave}) => (
  <div>
    <a onClick={onClickSave}>Save</a>
  </div>
)

Saver.propTypes = {
  onClickSave: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClickSave: () => {
    dispatch((_, getState) => {
      const state = getState()
      localStorage.setItem(
        'loopda',
        JSON.stringify(state)
      )
    })
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Saver)
