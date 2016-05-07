import React from 'react'
import classNames from 'classnames'
import shallowEqual from 'qux/lib/shallowEqual'
import Cell from '../containers/Cell'

const Line = ({song, row, cells, isStartLine, isPlaying, onClickCell}) => {
  const cssClass = classNames({
    'song-grid-line': true,
    'is-start-line': isStartLine,
    'is-playing': isPlaying,
  })
  return (
    <div className={cssClass}>
      {cells.map((channel, i) =>
        <Cell key={i} id={channel}
              active={shallowEqual([i, row], song.cursor)}
              position={[i, row]}
              onClick={onClickCell} />
      )}
    </div>
  )
}

Line.propTypes = {
  song: React.PropTypes.object.isRequired,
  row: React.PropTypes.number.isRequired,
  cells: React.PropTypes.array.isRequired,
  isStartLine: React.PropTypes.bool.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
}

export default Line
