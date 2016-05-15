import React from 'react'
import styleConstants from 'loopda/src/globals/style-constants'
import {PureComponent} from 'loopda/lib/react-ext'

class TempoBar extends PureComponent {

  render() {
    const {beat} = this.props
    const offset = styleConstants.blipWidth * beat
    const style = {left: offset + 'px'}
    return <div className="tempo-bar" style={style} />
  }

}

TempoBar.propTypes = {
  beat: React.PropTypes.number.isRequired
}

export default TempoBar
