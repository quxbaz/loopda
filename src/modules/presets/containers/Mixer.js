import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {mixables} from 'trax'
import {mixableInitialState} from 'loopda/lib/trax/mixables/reducer'
import omit from 'qux/lib/omit'
import capitalize from 'qux/lib/capitalize'
import throttle from 'qux/lib/throttle'
import audioService from 'loopda/src/globals/audioService'
import ui from '../../ui'

const testSound = throttle(audioService.play.bind(audioService), 60)

const Mixer = ({mixable, onMix, onReset}) => {

  const validMixables = omit(mixable, (value, key) =>
    key === 'id' || key === 'sample' ||
    key.startsWith('min') || key.startsWith('max')
  )

  const props = Object.keys(validMixables).sort()

  return (
    <div className="mixer">
      {props.map(prop =>
        <div key={prop} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <ui.components.Slider
            name={prop}
            value={mixable[prop]}
            min={mixable['min' + capitalize(prop)]}
            max={mixable['max' + capitalize(prop)]}
            onChange={onMix} />
          {mixable[prop] !== mixableInitialState[prop] &&
            <a className="action cancel-action clicky" onClick={() => onMix(prop, mixableInitialState[prop])}>reset</a>}
        </div>
      )}
      <a className="action danger-action clicky" onClick={onReset}>Reset All Defaults</a>
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
  onReset() {
    const defaults = omit(mixableInitialState, 'id', 'sample')
    dispatch(mixables.actions.mix(mixable.id, defaults))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(Mixer)
