import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {songs} from 'trax'

/*
  Line component
*/

// Line.propTypes = {
//   line: React.PropTypes.array.isRequired,
//   row: React.PropTypes.number.isRequired,
//   onClickSlot: React.PropTypes.func
// }

// function Line(props) {
//   let {line, row, onClickSlot} = props
//   let slots = line.map((channelId, i) => {
//     return <Slot key={i} position={[i, row]} channelId={channelId}
//                  onClick={onClickSlot} />
//   })
//   return <div className="line">{slots}</div>
// }


/*
  Slot component
*/

// const Slot = React.createClass({
//   propTypes: {
//     position: React.PropTypes.array.isRequired,
//     channelId(props, propName) {
//       let prop = props[propName]
//       if (typeof prop !== 'string' && prop !== null)
//         throw new Error('@channelId must be an id or null.')
//     },
//     onClick: React.PropTypes.func
//   },
//   render() {
//     let {position, channelId} = this.props
//     let style = {}
//     if (channelId) {
//       var channel = store.Channel.get(channelId, true)
//       style = {background: channel.state.color}
//     }
//     let onClick = () => {
//       let el = this.refs.slot
//       this.props.onClick(position, [el.offsetLeft, el.offsetTop])
//     }
//     return (
//       <div ref="slot" className="slot" style={style} onClick={onClick}>
//         {channelId ? channel.state.sample + ' (' + channel.state.number + ')' : '-'}
//       </div>
//     )
//   }
// })


/*
  AddNewLine component
*/

AddNewLine.propTypes = {
  onClick: React.PropTypes.func
}

function AddNewLine(props) {
  return (
    <div>
      <a onClick={props.onClick}>Add Line</a>
    </div>
  )
}


/*
  Song component
*/

class SongGrid extends React.Component {

  render() {
    const {song} = this.props
    // let lines = song.state.data.map((line, i) => {
    //   return <Line key={i} row={i} line={line} onClickSlot={this.handleClickSlot} />;
    // });
    return (
      <div className="song-grid">
        {'grid'}
      </div>
    )
  }

}

SongGrid.propTypes = {
  song: React.PropTypes.object.isRequired,
  onClickCell: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, {id}) => ({
  song: songs.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClickCell: () => {
    console.log('click cell')
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongGrid)
