import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

const Saver = ({onClickSave}) => (
  <a onClick={onClickSave}>Save</a>
)

Saver.propTypes = {
  onClickSave: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onClickSave: () => {
    dispatch((dispatch, getState) => {
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
