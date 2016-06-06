import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import {blips} from 'trax'
import Blip from '../components/Blip'

const BlipList = ({blips}) => (
  <div className="blip-list">
    {blips.map((blip) => <Blip key={blip.id} blip={blip} />)}
  </div>
)

BlipList.propTypes = {
  blips: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, {ids}) => ({
  blips: ids
    .filter((id) => !isNil(id))
    .map((id) => blips.selectors.getById(id)(state)),
})

export default connect(
  mapStateToProps
)(BlipList)
