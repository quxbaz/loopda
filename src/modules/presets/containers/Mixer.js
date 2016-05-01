import React from 'react'
import {connect} from 'react-redux'
import {mixables, } from 'trax'
import omit from 'qux/lib/omit'
import capitalize from 'qux/lib/capitalize'
import throttle from 'qux/lib/throttle'
import audioService from 'loopda/src/globals/audioService'
import ui from '../../ui'

const Mixer = ({mixable, onMixChange}) => {

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
         onChange={onMixChange} />
      )}
    </div>
  )

}

Mixer.propTypes = {
  mixable: React.PropTypes.object.isRequired,
  onMixChange: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, {id}) => ({
  mixable: mixables.selectors.getById(id)(state)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMixChange: (name, value) => {
    dispatch(
      mixables.actions.mix(id, {[name]: value})
    )
  }
})

const previewSound = throttle(
  audioService.play.bind(audioService),
  60
)

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  onMixChange: (name, value) => {
    dispatchProps.onMixChange(name, value)
    previewSound({...stateProps.mixable, mute: false})
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Mixer)
