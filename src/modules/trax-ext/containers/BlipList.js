/*
  <WARNING> Deprecated in favor of using smaller containers. Map over
  Blip containers instead while passing the id.
*/

import React from 'react'
import {connect} from 'react-redux'
import isNil from 'qux/lib/isNil'
import {blips} from 'trax'
import {PureComponent} from 'loopda/lib/react-ext'
import Blip from '../components/Blip'

class BlipList extends PureComponent {
  render() {
    const {blips} = this.props
    return (
      <div className="blip-list">
        {blips.map((blip) => <Blip key={blip.id} blip={blip} />)}
      </div>
    )
  }
}

BlipList.propTypes = {
  blips: React.PropTypes.array.isRequired,
}

/*
  Using a WeakMap to memoize query results. Without this, The BlipList
  component is rerendered every state change causing massive slowdowns
  in some cases. WeakMap holds keys weakly, which means that if there
  are no references to the key, the entry will be removed. Our state
  is completely immutable so references are detached as soon as the
  state updates. This means that we don't need to worry about the
  object eventually consuming all memory.
*/
const mapStateToProps = () => {
  const cache = new WeakMap()
  return (state, {ids}) => {
    let result
    if (!cache.has(ids)) {
      result = ids
        .filter(id => !isNil(id))
        .map(id => blips.selectors.getById(id)(state)),
      cache.set(ids, result)
    } else {
      result = cache.get(ids)
    }
    return {blips: result}
  }
}

export default connect(
  mapStateToProps()
)(BlipList)
