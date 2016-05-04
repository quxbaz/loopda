import React from 'react'
import {connect} from 'react-redux'
import {songs} from 'trax'

const AddLines = ({onClick}) => (
  <button className="song-grid-add-lines" onClick={onClick}>
    Add more lines
  </button>
)

const mapDispatchToProps = (dispatch, {id}) => ({
  onClick: () => {
    dispatch(
      songs.actions.addLines(id)
    )
  }
})

export default connect(
  null,
  mapDispatchToProps
)(AddLines)
