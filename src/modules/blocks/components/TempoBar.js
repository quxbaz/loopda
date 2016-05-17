import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'

class TempoBar extends PureComponent {

  render() {
    const {beat} = this.props
    const style = {
      left: 100 / 16 * beat + '%',
    }
    return <div className="tempo-bar" style={style} />
  }

}

TempoBar.propTypes = {
  beat: React.PropTypes.number.isRequired,
}

export default TempoBar
