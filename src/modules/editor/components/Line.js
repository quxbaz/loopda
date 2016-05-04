import React from 'react'
import shallowEqual from 'qux/lib/shallowEqual'
import Cell from '../containers/Cell'

const Line = ({song, row, cells, onClickCell}) => (
  <div className="song-grid-line">
    {cells.map((channel, i) =>
      <Cell key={i} id={channel}
            active={shallowEqual([i, row], song.cursor)}
            position={[i, row]}
            onClick={onClickCell} />
    )}
  </div>
)

Line.propTypes = {
  song: React.PropTypes.object.isRequired,
  row: React.PropTypes.number.isRequired,
  cells: React.PropTypes.array.isRequired,
}

export default Line
