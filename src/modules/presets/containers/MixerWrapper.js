/*
  This container's only purpose is to process a preset id and pass its
  mixable id to a Mixer container.
*/

import React from 'react'
import {connect} from 'react-redux'
import {presets} from 'trax'
import Mixer from './Mixer'

const MixerWrapper = ({id}) => <Mixer id={id} />

MixerWrapper.propTypes = {
  id: React.PropTypes.string.isRequired
}

const mapStateToProps = (state, {id}) => ({
  id: presets.selectors.getById(id)(state).mixable
})

export default connect(
  mapStateToProps
)(MixerWrapper)
