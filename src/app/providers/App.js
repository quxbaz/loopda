import {connect} from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state) => ({
  url: state.url,
})

export default connect(mapStateToProps)(App)
