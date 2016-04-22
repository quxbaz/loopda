import React from 'react'
import shallowCompare from 'react/lib/shallowCompare'

class PureComponent extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

}

export default PureComponent
