import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'stateful-router'
import overview from '../../modules/overview'

const App = ({sequencer}) => {
  return (
    <div>
      <Route route="overview">
        <overview.components.Overview sequencer={sequencer} />
      </Route>
    </div>
  )
}

const mapStateToProps = (state) => ({
  sequencer: state.sequencer
})

export default connect(
  mapStateToProps
)(App)
