import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {mixables} from 'trax'
import omit from 'qux/lib/omit'
import capitalize from 'qux/lib/capitalize'
import throttle from 'qux/lib/throttle'
import audioService from 'loopda/src/globals/audioService'
import ui from '../../ui'

const testSound = throttle(audioService.play.bind(audioService), 60)

const Mixer = ({mixable, onMix}) => {

  const validMixables = omit(mixable, (value, key) =>
    key === 'id' || key === 'sample' ||
    key.startsWith('min') || key.startsWith('max')
  )

  const props = Object.keys(validMixables).sort()

  return (
    <div className="mixer">
      {props.map(prop =>
        <ui.components.Slider
          key={prop}
          name={prop}
          value={mixable[prop]}
          min={mixable['min' + capitalize(prop)]}
          max={mixable['max' + capitalize(prop)]}
          onChange={onMix} />
      )}
    </div>
  )

}

Mixer.propTypes = {
  mixable: PropTypes.object.isRequired,
  onMix: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, {mixable}) => ({
  onMix(name, value) {
    const action = mixables.actions.mix(mixable.id, {[name]: value})
    dispatch(action)
    testSound({...mixable, mute: false})
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Mixer)
