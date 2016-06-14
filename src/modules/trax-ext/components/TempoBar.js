import React, {PropTypes} from 'react'
import {PureComponent} from 'loopda/lib/react-ext'

class TempoBar extends PureComponent {

  render() {
    const style = {
      left: 100 / 16 * this.props.beat + '%',
    }
    return <div className="tempo-bar" style={style} />
  }

}

TempoBar.propTypes = {
  beat: PropTypes.number.isRequired,
}

export default TempoBar
